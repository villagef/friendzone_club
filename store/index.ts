import { create } from "zustand"

interface StoreProps {
  email: string | null
  setEmail: (email: string) => void
}

const useStore = create<StoreProps>((set) => ({
  email: null,
  setEmail: (value: string) => set(() => ({ email: value })),
}))

export default useStore
