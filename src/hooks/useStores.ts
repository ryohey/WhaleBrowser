import { createContext, useContext } from "react"
import DatabaseStore from "../stores/DatabaseStore"
import LogStore from "../stores/LogStore"
import MovieStore from "../stores/MovieStore"
import NavStore from "../stores/NavStore"
import PreferenceStore from "../stores/PreferenceStore"

export interface Stores {
    databaseStore: DatabaseStore,
    logStore: LogStore,
    movieStore: MovieStore,
    navStore: NavStore,
    preferenceStore: PreferenceStore,
    openDatabase: (path: string) => void
}

export const StoreContext = createContext<Stores>(
  null as unknown as Stores // never use default value
)
export const useStores = () => useContext(StoreContext)
