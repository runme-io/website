import specStore from '../components/Stores/SpecGenerator'

function parseSpecService (service, isMain = false) {
  let parsedService = {
    command: formatCommand(service),
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
        config: './.runme/Dockerfile',
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
        public: 80,
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

  let dockerfileLines = [
    `FROM ${appValue.dockerImage}`,
    'WORKDIR /app',
    'COPY . .',
  ]

  if (appValue.build_command) {
    dockerfileLines = dockerfileLines.concat(`RUN ${appValue.build_command}`)
  }

  const command = formatCommand(appValue)
  if (command) {
    dockerfileLines = dockerfileLines.concat(`ENTRYPOINT ${command}`)
  }

  return dockerfileLines.join('\n')
}

function formatCommand ({ command }) {
  if (!command) { return '' }

  return Array.isArray(command)
    ? command.join(' && ')
    : command
}

export async function generateSpec () {
  const serviceList = specStore.getAll()

  return {
    yaml: await generateYaml(serviceList),
    dockerfile: generateDockerfile(serviceList),
  }
}
