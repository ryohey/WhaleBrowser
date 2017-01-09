import { observable, computed } from "mobx"
import _ from "lodash"

export default class DatabaseStore {
  @observable databases = []
  @observable _currentDatabase

  @computed get currentDatabase() {
    return this._currentDatabase || _.first(this.databases)
  }

  set currentDatabase(value) {
    this._currentDatabase = value
  }
}
