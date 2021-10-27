import React, { useState } from 'react';
import useStyles from './styles';

import { TextField, Button, Modal } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddNewTask({
  isShow,
  setIsShow,
  expenses,
  setExpenses,
  generateID,
}) {
  const classes = useStyles();

  const [data, setData] = useState({
    Date: null,
    Description: '',
    InvoiceNo: '',
    Amount: '',
  });

  const onClose = () => {
    setIsShow(false);
    setData({
      Date: null,
      Description: '',
      InvoiceNo: '',
      Amount: '',
    });
  };

  const onSubmit = () => {
    if (
      data.Date !== null &&
      data.Description !== '' &&
      data.InvoiceNo !== '' &&
      data.Amount !== ''
    ) {
      if (Number.isFinite(parseFloat(data.Amount)) === true) {
        data.id = generateID();
        var dd = String(data.Date.getDate()).padStart(2, '0');
        var mm = String(data.Date.getMonth() + 1).padStart(2, '0');
        var yyyy = data.Date.getFullYear();
        data.Date = dd + '/' + mm + '/' + yyyy;
        expenses.push(data);
        setExpenses(expenses);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        onClose();
      } else {
        alert('Please enter the correct data type');
      }
    } else {
      alert('Please enter full data');
    }
  };

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Create New Expenses</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            inputFormat="dd/MM/yyyy"
            value={data.Date}
            onChange={(e) => setData({ ...data, Date: e })}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          label="Description"
          value={data.Description}
          onChange={(e) => setData({ ...data, Description: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          label="Invoice No."
          value={data.InvoiceNo}
          onChange={(e) => setData({ ...data, InvoiceNo: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          label="Amount"
          value={data.Amount}
          step="0.01"
          onChange={(e) => setData({ ...data, Amount: e.target.value })}
          style={{ marginBottom: '10px' }}
        />

        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="error"
            component="span"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
