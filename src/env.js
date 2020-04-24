const detectBool = (value) => value === 'true' || value === 'false' ? JSON.parse(value) : value

export const JEXIA_CREDENTIALS = {
  applicationProjectID: 'jexia-application-project-id',
  key: 'jexia-api-key',
  secret: 'jexia-api-secret',
}

export const RUNME_API = {
  host: 'runme-api-host',
  secure: detectBool('runme-api-secure'),
}

export const DEPLOYMENT = {
  host: 'deployment-host',
}
