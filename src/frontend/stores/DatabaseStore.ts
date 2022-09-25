import _ from "lodash"
import { computed, makeObservable, observable } from "mobx"
import { makePersistable } from "mobx-persist-store"

export default class DatabaseStore {
  databases = []
  _currentDatabase = null

  constructor() {
    makeObservable(this, {
      databases: observable,
      _currentDatabase: observable,
      currentDatabase: computed,
    })

    makePersistable(this, {
      name: "DatabaseStore",
      properties: ["databases", "_currentDatabase"],
      storage: window.localStorage,
    })
  }

  get currentDatabase() {
    return this._currentDatabase || _.first(this.databases)
  }

  set currentDatabase(value) {
    this._currentDatabase = value
  }
}
