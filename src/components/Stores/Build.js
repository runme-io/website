import { writable } from 'svelte/store'
import { run } from '../Helpers/Const'
import { wsBuild } from '../Helpers/WebSocket'

function createBuild () {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    get: async (build_id, startWebSocket = false) => {
      try {
        const [build] = await run(`v1/builds/${build_id}`, 'GET')

        set(build)

        if (startWebSocket) {
          // fireup the WebSocket to get realtime updates
          wsBuild(build_id, message => set(message))
        }
      } catch (error) {
        set({ error })
      }
    },
    start: async (app_id) => {
      try {
        const build = await run(`v1/apps/${app_id}/run`, 'POST')

        set(build)
      } catch (error) {
        set({ error })
      }
    },
  }
}

export const build = createBuild()

