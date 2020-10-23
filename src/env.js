const detectBool = (value) => value === 'true' || value === 'false' ? JSON.parse(value) : value

export const JEXIA_CREDENTIALS = {
  projectID: 'jexia-application-project-id',
  key: 'jexia-api-key',
  secret: 'jexia-api-secret',
  zone: 'jexia-project-zone',
}

export const RUNME_API = {
  host: 'runme-api-host',
  secure: detectBool('runme-api-secure'),
}

export const DEPLOYMENT = {
  host: 'deployment-host',
}
