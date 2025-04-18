import CounterStore from "./counterStore";
import { createContext } from "react";
import { UIStore } from "./uiStore";
interface Store {
    counterStore: CounterStore
    uiStore: UIStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore()
}

export const StoreContext = createContext<Store>(store)
