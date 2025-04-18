import { makeObservable, observable, action } from "mobx"

export default class CounterStore {
  count = 42
  title = "Counter store"

  constructor() {
    makeObservable(this, {
        title: observable,
        count: observable,
        increment: action,
        decrement: action,
        reset: action
    })
  }

  increment = (amount = 1) => {
    this.count += amount
  }

  decrement = (amount = 1) => {
    this.count -= amount
  }

  reset = () => {
    this.count = 0
  }
}