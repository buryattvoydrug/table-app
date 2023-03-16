export interface AuthState {
  isLoading?: boolean,
  error?: boolean,
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
        error: false,
        isLoading: false,
        loginInfo: {
          authToken: action.payload.authToken,
          username: action.payload.username,
        },
      }
    }
    case "LOGIN_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        loginInfo: {}
      }
    }
    default:
      return state
  }
}