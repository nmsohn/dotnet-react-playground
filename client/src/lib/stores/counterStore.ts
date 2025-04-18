import { makeObservable, observable, action } from "mobx"

export default class CounterStore {
  count = 0
  title = "Counter store"

  constructor() {
    makeObservable(this, {
        title: observable,
        count: observable,
    })
  }
}