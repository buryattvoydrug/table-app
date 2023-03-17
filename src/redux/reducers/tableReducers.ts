type TYear         = `${number}${number}${number}${number}`;
type TMonth        = `${number}${number}`;
type TDay          = `${number}${number}`;
type THours        = `${number}${number}`;
type TMinutes      = `${number}${number}`;
type TSeconds      = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

export type DateISO = `${TYear}-${TMonth}-${TDay}T${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}Z`;

export interface TableData {
  "companySigDate": DateISO,
  "companySignatureName": string,
  "documentName": string,
  "documentStatus": string,
  "documentType": string,
  "employeeNumber": string,
  "employeeSigDate": DateISO,
  "employeeSignatureName": string,
  "id": string,
}

export interface TableState {
  isLoading?: boolean,
  error?: boolean,
  data: TableData[],
}

export interface TableAction {
  type: string,
  payload?: TableData[],
}

export const tableReducer = (state: TableState = { data: [] }, action: TableAction) => {
  switch (action.type) {
    case "START_GET_TABLE": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "GET_TABLE_SUCCESS": {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: action.payload,
      }
    }
    case "GET_TABLE_FAILURE": {
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