import { writable } from 'svelte/store'
import { runApiRequest } from '../Helpers/Const'
import { JEXIA_CREDENTIALS } from '../../env'

function createApplication() {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    create: async (repo_url, repo_branch = 'master', docker_image = '', env_variables = {}) => {
      try {
        const application = await runApiRequest('v1/apps', 'POST', {
          repo_url,
          repo_branch,
          docker_image,
          env_variables,
        })

        set(application || {})
      }
      catch (error) {
        set({ error })
      }
    },
    get: app_id => {
      if (process.browser) {
        import('jexia-sdk-js/browser').then(jexiaModule => {
          const dataModule = jexiaModule.dataOperations()

          const credentials = {
            projectID: JEXIA_CREDENTIALS.applicationProjectID,
            key: JEXIA_CREDENTIALS.key,
            secret: JEXIA_CREDENTIALS.secret,
          };

          jexiaModule.jexiaClient().init(credentials, dataModule)

          const appsDataset = dataModule.dataset('applications')

          appsDataset
            .select()
            .where(field => field('id').isEqualTo(app_id))
            .subscribe(
              ([result]) => set(result || {}),
              () => {} // TODO handle errors
            )
        })
      }
    }
  }
}

export const application = createApplication();
