import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TableAction, TableData, TableState } from "../reducers/tableReducers"

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
      console.log(data)


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

export const addRowToTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE" })

      const response = await fetch(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth': authToken,
         },
        body: JSON.stringify(rowObj),
      });

      const data = await response.json()


      if (data.data) {
        console.log(data.data)
        dispatch({ 
          type: "ADD_TABLE_SUCCESS",
          payload: [data.data],
         })
  
      } else {
        throw new Error('Ошибка авторизации')
      }
      console.log(data)

    } catch (error) {
      dispatch({ 
        type: "GET_TABLE_FAILURE",
      })
    }
  }

export const deleteRowFromTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE" })

      const response = await fetch(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${rowObj.id}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth': authToken,
         },
      });

      const data = await response.json()

      if (data.error_message === "OK") {
        dispatch({ 
          type: "DELETE_TABLE_SUCCESS",
          payload: [rowObj],
         })
  
      } else {
        throw new Error('Ошибка')
      }
      console.log(data)

    } catch (error) {
      dispatch({ 
        type: "GET_TABLE_FAILURE",
      })
    }
  }

  export const updateRowTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE" })

      const response = await fetch(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/set/${rowObj.id}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth': authToken,
         },
         body: JSON.stringify(rowObj),
      });

      const data = await response.json()

      if (data.error_message === "OK") {
        dispatch({ 
          type: "UPDATE_TABLE_SUCCESS",
          payload: [rowObj],
         })
  
      } else {
        throw new Error('Ошибка')
      }
      console.log(data)

    } catch (error) {
      dispatch({ 
        type: "GET_TABLE_FAILURE",
      })
    }
  }