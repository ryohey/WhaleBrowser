import { makeObservable, observable } from "mobx"

export default class NavStore {
  isDrawerOpened = false

  constructor() {
    makeObservable(this, {
      isDrawerOpened: observable,
    })
  }
}
