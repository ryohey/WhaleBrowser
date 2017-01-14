import { observable, computed } from "mobx"
import _ from "lodash"

export default class LogStore {
  @observable logs = []

  add(log) {
    this.logs.push(log)
  }
}
