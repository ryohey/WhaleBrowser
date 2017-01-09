import { autorunAsync, toJS } from "mobx"
import storage from "electron-json-storage"

function sync(store, key, onRestore) {
  const generatedKey = `${store.constructor.name}.${key}`
  storage.get(generatedKey, (error, data) => {
    if (!error) {
      store[key] = data
    }
    onRestore(error)

    // start sync
    autorunAsync(() => {
      const value = toJS(store[key])
      storage.set(generatedKey, value)
      console.log(`saved ${generatedKey} to ${value}`)
    }, 300)
  })
}

export default function syncPrefs({ databaseStore }, complete) {
  const items = [
    [databaseStore, "databases"],
    [databaseStore, "currentDatabase"]
  ]
  let count = items.length
  items.forEach(e => sync(e[0], e[1], () => {
    if (count === 0) {
      complete()
    }
  }))
}
