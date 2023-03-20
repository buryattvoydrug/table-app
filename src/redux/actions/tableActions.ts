import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TableAction, TableData, TableState } from "../reducers/tableReducers"

export const getTable = (authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE", payload: {} })

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
          payload: {
            data: data.data
          },
         })
  
      } else {
        throw new Error(data.error_code + ' ' + data.error_text);
      }
    } catch (e) {
      dispatch({ 
        type: "TABLE_FAILURE",
        isLoading: false,
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }

export const addRowToTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ 
        type: "START_GET_TABLE", 
        payload: {} 
      })

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
        dispatch({ 
          type: "ADD_TABLE_SUCCESS",
          payload: {
            data: [data.data]
          },
         })
      } else {
        throw new Error(data.status + ' ' + data.title);
      }
    } catch (e) {
      dispatch({ 
        type: "TABLE_FAILURE",
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }

export const deleteRowFromTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE", payload: {} })

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
          payload: {
            data: [rowObj]
          },
         })
  
      } else {
        throw new Error(data.status + ' ' + data.title);
      }
    } catch (e) {
      dispatch({ 
        type: "TABLE_FAILURE",
        isLoading: false,
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }

  export const updateRowTable = (rowObj: TableData, authToken: string): ThunkAction<Promise<void>, TableState, unknown, TableAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, TableAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE", payload: {} })

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
          payload: {
            data: [rowObj]
          },
         })
  
      } else {
        throw new Error(data.status + ' ' + data.title);
      }
    } catch (e) {
      dispatch({ 
        type: "TABLE_FAILURE",
        isLoading: false,
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }

export const customAlert = (alert: string): ThunkAction<Promise<void>, TableState, unknown, AnyAction> => 
  async (dispatch: ThunkDispatch<TableState, unknown, AnyAction>): Promise<void> => {
    try {
      dispatch({ type: "START_GET_TABLE", payload: {} })
      throw new Error(alert);
    } catch (e) {
      dispatch({ 
        type: "TABLE_FAILURE",
        isLoading: false,
        payload: {
          error: (e as Error).message,
        },
      })
    }
  }