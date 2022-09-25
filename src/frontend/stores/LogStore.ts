import { makeObservable, observable } from "mobx"

export default class LogStore {
  logs = []

  constructor() {
    makeObservable(this, {
      logs: observable,
    })
  }

  add(log) {
    this.logs.push(log)
  }
}
