export interface AuthState {
  isLoading?: boolean,
  error?: string,
  loginInfo: {
    username?: string,
    authToken?: string,
  }
}

export interface AuthAction {
  type: string,
  payload: {
    username?: string,
    authToken?: string,
    error?: string,
  },
}

export const authReducer = (state: AuthState = { loginInfo: {} }, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        error: action.payload?.error,
        isLoading: false,
        loginInfo: {
          authToken: action.payload?.authToken,
          username: action.payload?.username,
        },
      }
    }
    case "LOGIN_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        error: action.payload?.error,
        loginInfo: {}
      }
    }
    default:
      return state
  }
}