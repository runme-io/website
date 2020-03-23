import { writable } from 'svelte/store'
import { dataOperations, jexiaClient } from 'jexia-sdk-js/browser'

function createApplication() {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    set,
    get: app_id => {
      if (process.browser) {
        const dataModule = dataOperations()

        const credentials = {
          projectID: process.env.APPLICATION_PROJECT_ID,
          key: process.env.API_KEY,
          secret: process.env.API_SECRET,
        };

        jexiaClient().init(credentials, dataModule)

        const appsDataset = dataModule.dataset('applications')

        appsDataset
          .select()
          .where(field => field('id').isEqualTo(app_id))
          .subscribe(
            ([result]) => set(result),
              error => {} // ignore error for now
          )
      }
    }
  }
}

export const application = createApplication();
