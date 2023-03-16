import { error } from "console"
import { AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "../store"

export const login = (username: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch({ type: "LOGIN_START" })

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
          },
         })
  
        localStorage.setItem('authToken', JSON.stringify(data.data.token))
        localStorage.setItem('userName', JSON.stringify(username))
      } else {
        throw new Error('Ошибка авторизации')
      }
    } catch (error) {
      dispatch({ 
        type: "LOGIN_FAILURE",
        payload: error
      })
      console.log(error)
    }
  }


export const logout = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction>  => 
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')

    dispatch({ type: "LOGOUT" })
  }
