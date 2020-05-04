function parseSpecService (service) {
    let parsedService = {
        image: service.dockerImage,
        command: service.command,
    }

    if (service.envVars) {
        parsedService = {
            ...parsedService,
            environment: service.envVars,
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

export async function generateYaml (serviceList) {
    const { default: YAML } = await import('yaml')

    const services = serviceList.slice(1)
        .map(({ value }) => parseSpecService(value))
        .reduce(
            (accumulator, service, index) => {
                accumulator[`service_${index + 1}`] = service
                return accumulator
            },
            {
                app: parseSpecService(serviceList[0].value),
            },
        )

    return YAML.stringify({
        version: '1.0',
        publish: 'app',
        services,
    })
}

export function generateDockerfile ({ dockerImage, command }) {
    return `
FROM ${dockerImage}
WORKDIR /app
COPY . .
RUN ${command}
    `
}
