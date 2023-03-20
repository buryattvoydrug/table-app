import { IconButton, Snackbar } from '@mui/material';
import React, { useEffect } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TableState } from '../redux/reducers/tableReducers';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorAlert() {
  const [open, setOpen] = React.useState(false);

  const tableData = useSelector<RootState, TableState>(
    (state: RootState) => state.tableData
  )

  const { isLoading, error } = tableData

  useEffect(() => {
    setOpen(!!error)
  }, [error, isLoading])

  const alertColor = (errStr: string) => {
    switch (errStr[0] || '') {
      case "4": {
        return "error"
      }
      case "2": {
        return "success"
      }
      default: {
        return "info"
      }
    }
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={10000}>
          <Alert
            severity={alertColor(error || '')}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
      </Snackbar>
    </>
  )
}
