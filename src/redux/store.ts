import { authReducer } from "./reducers/authReducers"
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { tableReducer } from "./reducers/tableReducers"

const reducers = combineReducers({
  userLogin: authReducer,
  tableData: tableReducer,
})

const authTokenFromStorage = localStorage.getItem('authToken')
  ? JSON.parse(localStorage.getItem('authToken')!)
  : null

const usernameFromStorage = localStorage.getItem('userName')
  ? JSON.parse(localStorage.getItem('userName')!)
  : null

const initialState = {
  userLogin: {
    loginInfo: { 
      username: usernameFromStorage,
      authToken: authTokenFromStorage,
    }
  },
} as {}

const middleware = [thunk]

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export type RootState = ReturnType<typeof store.getState>
