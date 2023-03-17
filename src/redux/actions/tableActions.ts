import { AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TableAction, TableState } from "../reducers/tableReducers"
import { RootState } from "../store"

export const getTable = (authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE" })

      const response = await fetch(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth': authToken,
         },
      });

      const data = await response.json()

      if (data.data) {
        dispatch({ 
          type: "GET_TABLE_SUCCESS",
          payload: data.data,
         })
  
      } else {
        throw new Error('Ошибка авторизации')
      }
    } catch (error) {
      dispatch({ 
        type: "GET_TABLE_FAILURE",
      })
    }
  }