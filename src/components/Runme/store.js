
import { writable } from 'svelte/store'
import { dataOperations, jexiaClient } from 'jexia-sdk-js/browser'
import { jexiaCredentials } from '../env'

const dataModule = dataOperations()

jexiaClient().init(jexiaCredentials, dataModule)

const meetupDataset = dataModule.dataset('meetup')

export function meetupStore () {
  const { subscribe, set } = writable([])
  let _meetups

  // load meetups
  meetupDataset
    .select()
    .subscribe(allMeetups => {
      _meetups = allMeetups
      set(_meetups)
    })

  function insert (newMeetup) {
    meetupDataset
      .insert(newMeetup)
      .subscribe(([createdMeetup]) => {
        set([createdMeetup, ..._meetups])
      })
  }

  function toggleFavorite (meetupId) {
    const meetup = _meetups.find(m => m.id === meetupId)

    meetupDataset
      .update({
        id: meetupId,
        isFavorite: meetup.isFavorite === undefined ? true : !meetup.isFavorite
      })
      .subscribe(([updatedMeetup]) => {
        Object.assign(meetup, updatedMeetup)
        set([..._meetups])
      })
  }

  return {
    subscribe,
    insert,
    toggleFavorite
  }
}
