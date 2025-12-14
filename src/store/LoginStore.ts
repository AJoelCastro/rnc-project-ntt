import { create } from 'zustand'

type UserData = {
  idUser: number
  name: string
  lastName: string
  email: string
  phone: string
  token: string
}

type LoginState = {
  userData: UserData | null
}

type LoginActions = {
  setUserData: (userData: UserData) => void
  clearUserData: () => void
}

type LoginStore = LoginState & LoginActions

const initialState: LoginState = {
  userData: null,
}

export const useLogin = create<LoginStore>()(

    (set) => ({
        ...initialState,
        setUserData: (userData: UserData) =>
          set(
            {
              userData,
            },
            false,
          ),
        clearUserData: () =>
          set(
            {
              userData: null,
            },
            false,
          ),
    })
)