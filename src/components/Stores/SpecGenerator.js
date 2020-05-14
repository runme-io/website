import { writable, get } from 'svelte/store'

const createService = () => ({
  /*
   * Whether the user select to provide a image or select one from a list
   */
  hasDockerImage: false,
  dockerImage: '',
  envVars: {},
  port: undefined,
  build_command: '',
  command: '',
})

const { subscribe, update } = writable([])

export default {
  subscribe,
  addService () {
    update(services => [
      ...services,
      createService(),
    ])
  },
  removeService (serviceToBeRemoved) {
    let previousIndex

    update(services => {
      previousIndex = services.indexOf(serviceToBeRemoved) - 1
      return services.filter(service => service !== serviceToBeRemoved)
    })

    return previousIndex
  },
  getAll () {
    return get({ subscribe })
  },
}
