import { Snackbar } from '@mui/material';
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TableState } from '../redux/reducers/tableReducers';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorAlert() {
  const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
    // setOpen(true);
  // };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  )
}
