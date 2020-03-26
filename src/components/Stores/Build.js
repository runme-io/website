import { writable, derived } from 'svelte/store'
import { runApiRequest } from '../Helpers/Const'
import { wsBuild } from '../Helpers/WebSocket'

function createBuild () {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    get: async (build_id, startWebSocket = false) => {
      try {
        const build = await runApiRequest(`v1/builds/${build_id}`, 'GET')

        set(build || {})

        // fireup the WebSocket to get realtime updates
        if (startWebSocket) {
          wsBuild(build_id, message => set(message))
        }
      } catch (error) {
        set({ error })
      }
    },
    start: async (app_id) => {
      try {
        const build = await runApiRequest(`v1/apps/${app_id}/run`, 'POST')

        set(build || {})
      } catch (error) {
        set({ error })
      }
    },
  }
}

export const build = createBuild()

export const appId = derived(
  build,
  ({ app_id }) => app_id
)

