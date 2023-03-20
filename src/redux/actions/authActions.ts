import { AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AuthAction, AuthState } from "../reducers/authReducers"
import { RootState } from "../store"

export const login = (username: string, password: string): ThunkAction<Promise<void>, AuthState, unknown, AuthAction> => 
  async (dispatch: ThunkDispatch<AuthState, unknown, AuthAction>): Promise<void> => {
    try {
      dispatch({ type: "LOGIN_START", payload: {} })

      const response = await fetch(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json()

      if (data.data) {
        dispatch({ 
          type: "LOGIN_SUCCESS",
          payload: {
            authToken: data.data.token,
            username: username,
            error: data.error_message,
          },
         })
  
        localStorage.setItem('authToken', JSON.stringify(data.data.token))
        localStorage.setItem('userName', JSON.stringify(username))
      } else {
        throw new Error(data.error_code + ' ' + data.error_text);
      }
    } catch (e) {
      dispatch({ 
        type: "LOGIN_FAILURE",
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }


export const logout = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction>  => 
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')

    dispatch({ type: "LOGOUT" })
  }
