import { makeAutoObservable } from "mobx"

export default class CounterStore {
  count = 42
  title = "Counter store"

  constructor() {
    makeAutoObservable(this)
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