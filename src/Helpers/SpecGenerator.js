function parseSpecService (service, isMain = false) {
    let parsedService = {
        command: service.command,
    }

    if (Object.values(service.envVars || {}).length) {
        parsedService = {
            ...parsedService,
            environment: service.envVars,
        }
    }

    if (isMain && !service.hasDockerImage) {
        parsedService = {
            ...parsedService,
            build: {
                type: 'dockerfile',
                config: './.runme/Dockerfile'
            },
        }
    } else {
        parsedService = {
            ...parsedService,
            image: service.dockerImage,
        }
    }

    if (!service.port) {
        return parsedService
    }

    return {
        ...parsedService,
        ports: [
            {
                container: parseInt(service.port),
                public: 80
            },
        ],
    }
}

async function generateYaml (serviceList) {
    const { default: YAML } = await import('yaml')

    const services = serviceList.slice(1)
        .map(parseSpecService)
        .reduce(
            (accumulator, service, index) => {
                accumulator[`service_${index + 1}`] = service
                return accumulator
            },
            {
                app: parseSpecService(serviceList[0], true),
            },
        )

    return 'version: 1.0\n' + YAML.stringify({
        publish: 'app',
        services,
    })
}

function generateDockerfile (serviceList) {
    const appValue = serviceList[0] || {}

    if (appValue.hasDockerImage) {
        return ''
    }

    return `FROM ${appValue.dockerImage}
WORKDIR /app
COPY . .
RUN ${appValue.build_command}`
}

export async function generateSpec (serviceList) {
    return {
        yaml: await generateYaml(serviceList),
        dockerfile: generateDockerfile(serviceList),
    }
}
