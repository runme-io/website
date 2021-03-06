import { writable } from 'svelte/store'
import { runApiRequest } from '../../Helpers'
import { JEXIA_CREDENTIALS } from '../../env'

function createApplication () {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    create: async (repoUrl, repoBranch = 'master') => {
      try {
        const application = await runApiRequest('v1/apps', 'POST', {
          // eslint-disable-next-line camelcase
          repo_url: repoUrl,
          // eslint-disable-next-line camelcase
          repo_branch: repoBranch,
        })

        set(application || {})
      } catch (error) {
        set({ error })
      }
    },
    get: async (appId) => {
      if (!appId) { return }

      const { jexiaClient, dataOperations } = await import('jexia-sdk-js/browser')
      const dataModule = dataOperations()

      jexiaClient().init(JEXIA_CREDENTIALS, dataModule)

      const appsDataset = dataModule.dataset('applications')

      appsDataset
        .select()
        .where(field => field('id').isEqualTo(appId))
        .subscribe(
          ([result]) => set(result || {}),
          () => {}, // TODO handle errors
        )
    },
  }
}

export const application = createApplication()
