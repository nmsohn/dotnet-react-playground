import CounterStore from "./counterStore";
import { createContext } from "react";
interface Store {
    counterStore: CounterStore
}

export const store: Store = {
    counterStore: new CounterStore()
}

export const StoreContext = createContext<Store>(store)
