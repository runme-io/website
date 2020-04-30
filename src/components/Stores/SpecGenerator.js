import { writable } from 'svelte/store'

const createService = () => ({
    value: {
        /*
        * Whether the user select to provide a image or select one from a list
        */
        hasDockerImage: false,
        dockerImage: '',
        envVars: {},
        port: null,
        command: ''
    },
    valid: true,
})

export default function createSpecGenerator () {
    const { subscribe, update } = writable([])

    return {
      subscribe,
      addService () {
          update(services => [
              ...services,
              createService(),
          ])
      },
      setValid (index, valid) {
          update(services => {
              services[index].valid = valid
              return services
          })
      },
      removeService (service) {
          update(services => services.filter(s => s !== service))
      }
    }
}
