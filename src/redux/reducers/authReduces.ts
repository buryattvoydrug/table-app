export interface AuthState {
  isLoading?: boolean,
  error?: boolean,
  authToken: string
}

export interface AuthAction {
  type: string,
  payload: string,
}

export const authReducer = (state: AuthState = { authToken: "" }, action: AuthAction) => {
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
        authToken: {
          auth_token: action.payload,
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
    default:
      return state
  }
}