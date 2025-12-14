import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type UserData = {
  idUser: number
  name: string
  lastName: string
  email: string
  phone: string
}

type LoginState = {
  userData: UserData | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

type LoginActions = {
  setUserData: (userData: UserData) => void
  clearUserData: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  reset: () => void
}

type LoginStore = LoginState & LoginActions

const initialState: LoginState = {
  userData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const useLogin = create<LoginStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUserData: (userData: UserData) =>
          set(
            {
              userData,
              isAuthenticated: true,
              error: null,
            },
            false,
            'setUserData'
          ),
        clearUserData: () =>
          set(
            {
              userData: null,
              isAuthenticated: false,
            },
            false,
            'clearUserData'
          ),
        setLoading: (isLoading: boolean) =>
          set({ isLoading }, false, 'setLoading'),
        setError: (error: string | null) =>
          set({ error }, false, 'setError'),
        logout: () =>
          set(
            {
              userData: null,
              isAuthenticated: false,
              error: null,
              isLoading: false,
            },
            false,
            'logout'
          ),
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'login-store',
      }
    ),
    {
      name: 'LoginStore',
    }
  )
)