import storage from "electron-json-storage"
import { autorun, toJS } from "mobx"

function sync(store, key, onRestore) {
  const generatedKey = `${store.constructor.name}.${key}`
  storage.get(generatedKey, (error, data) => {
    if (!error) {
      store[key] = data
    }
    onRestore(error)

    // start sync
    autorun(
      () => {
        const value = toJS(store[key])
        storage.set(generatedKey, value)
        console.log(`saved ${generatedKey} to ${value}`)
      },
      { delay: 300 }
    )
  })
}

export default function syncPrefs({ databaseStore }, complete) {
  const items = [
    [databaseStore, "databases"],
    [databaseStore, "currentDatabase"],
  ]
  let count = items.length
  items.forEach((e) =>
    sync(e[0], e[1], () => {
      if (count === 0) {
        complete()
      }
    })
  )
}
