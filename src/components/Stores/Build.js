import { writable } from 'svelte/store'
import { runApiRequest, wsBuild } from '../../Helpers'

function createBuild () {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    get: async (buildId, startWebSocket = false) => {
      try {
        // TODO use "template literal" when the issue with ESLINT has been fixed
        // SEE https://github.com/babel/babel-eslint/issues/681#issuecomment-629804226
        const build = await runApiRequest('v1/builds/' + buildId, 'GET')

        set(build || {})

        // fire up the WebSocket to get realtime updates
        // also return the socket connection to close it when needed
        if (startWebSocket) {
          return wsBuild(buildId, message => set(message))
        }
      } catch (error) {
        set({ error })
      }
    },
    start: async (appId) => {
      try {
        // TODO use "template literal" when the issue with ESLINT has been fixed
        // SEE https://github.com/babel/babel-eslint/issues/681#issuecomment-629804226
        const build = await runApiRequest('v1/apps/' + appId + '/run', 'POST')

        set(build || {})
      } catch (error) {
        set({ error })
      }
    },
  }
}

export const build = createBuild()
