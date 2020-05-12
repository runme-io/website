import { notEmpty } from './Validation'

export function convertEnvVarsFromText (textEnvVars) {
    return textEnvVars
        .split('\n')
        .reduce((accumulator, currentValue) => {
            if (currentValue) {
                const [key = '', value = ''] = currentValue.split(/=(.+)/)
                accumulator = [...accumulator, { key, value }]
            }
            return accumulator
        }, [])
}

export function convertEnvVarsToText (envVars) {
    if (Array.isArray(envVars)) {
        return envVars
            .filter(isEntryValid)
            .reduce((accumulator, currentValue) => [...accumulator, `${currentValue.key}=${currentValue.value}`], []).join('\n')
    }
    return Object.entries(envVars).map(([key, value]) => `${key}=${value}`).join('\n')
}

export function isEntryValid({ key, value }) {
    return validKey(key) && notEmpty(value)
}

export const validKey = (value) => notEmpty(value) && value.match(/^[A-Z_a-z]+$/)
export const validateEnvVars = (envVars) => (envVars || []).every(isEntryValid)
