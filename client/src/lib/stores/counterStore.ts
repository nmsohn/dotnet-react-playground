import { makeAutoObservable } from "mobx"

export default class CounterStore {
  count = 42
  title = "Counter store"
  events: string[] = [
    `Initial count is ${this.count}`
  ]

  constructor() {
    makeAutoObservable(this)
  }

  increment = (amount = 1) => {
    this.count += amount
    this.events.push(`Increamented by ${amount}, Count is now ${this.count}`)
  }

  decrement = (amount = 1) => {
    this.count -= amount
    this.events.push(`Decreamented by ${amount}, Count is now ${this.count}`)
  }

  reset = () => {
    this.count = 0
    this.events.push(`Count reset to ${this.count}`)
  }

  get eventCount() {
    return this.events.length
  }
}