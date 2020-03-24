import { writable } from 'svelte/store'
import { dataOperations, jexiaClient } from 'jexia-sdk-js/browser'
import { runApiRequest } from '../Helpers/Const'
import { JEXIA_CREDENTIALS } from '../../env'

function createApplication() {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    create: async (repo_url, repo_branch = 'master', docker_image = '') => {
      try {
        const { data: application } = await runApiRequest('v1/apps', 'POST', {
          repo_url,
          repo_branch,
          docker_image
        })

        set(application)
      }
      catch (error) {
        set({ error })
      }
    },
    get: app_id => {
      if (process.browser) {
        const dataModule = dataOperations()

        const credentials = {
          projectID: JEXIA_CREDENTIALS.applicationProjectID,
          key: JEXIA_CREDENTIALS.key,
          secret: JEXIA_CREDENTIALS.secret,
        };

        jexiaClient().init(credentials, dataModule)

        const appsDataset = dataModule.dataset('applications')

        appsDataset
          .select()
          .where(field => field('id').isEqualTo(app_id))
          .subscribe(
            ([result]) => set(result || {}),
            () => {} // ignore error for now
          )
      }
    }
  }
}

export const application = createApplication();
