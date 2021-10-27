import React, { useState, useRef } from 'react';
import useStyles from './styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewTask from '../AddNewTask';

import XLSX from 'xlsx';
import html2canvas from 'html2canvas';

export default function Home() {
  const classes = useStyles();
  const localExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const [expenses, setExpenses] = useState(localExpenses);
  const [isShow, setIsShow] = useState(false);

  const ongenerate = () => {
    var expensesRaW = [
      {
        Date: '09/05/2021',
        Description: 'Azure',
        InvoiceNo: 'G004124521',
        Amount: 6.66,
        id: generateID(),
      },
      {
        Date: '23/05/2021',
        Description: 'Lucidchart',
        InvoiceNo: '452143124',
        Amount: 44.86,
        id: generateID(),
      },
      {
        Date: '29/05/2021',
        Description: 'GitHub',
        InvoiceNo: 'CH_82H82614A',
        Amount: 30.55,
        id: generateID(),
      },
      {
        Date: '07/06/2021',
        Description: 'GitHub',
        InvoiceNo: 'CH_437F2614B',
        Amount: 2.97,
        id: generateID(),
      },
      {
        Date: '07/06/2021',
        Description: 'Heroku',
        InvoiceNo: 'HK2917416',
        Amount: 18.93,
        id: generateID(),
      },
    ];
    localStorage.setItem('expenses', JSON.stringify(expensesRaW));
    setExpenses(expensesRaW);
  };

  const totalAmount = () => {
    return expenses
      .reduce((amount, item) => parseFloat(item.Amount) + amount, 0)
      .toFixed(2);
  };

  const onDeleteItem = (id) => {
    var filterexpenses = expenses.filter((item) => {
      return item.id !== id;
    });
    setExpenses(filterexpenses);
    localStorage.setItem('expenses', JSON.stringify(filterexpenses));
  };

  const OnOpenAddNewTask = () => {
    setIsShow(true);
  };

  const onExportToExcel = () => {
    const newExpenses = expenses.map((item) => {
      delete item.id;
      return item;
    });
    const worksheet = XLSX.utils.json_to_sheet(newExpenses);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, worksheet, 'Expenses ');
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
    XLSX.writeFile(workBook, 'ExpensesData.xlsx');
  };

  const onExportToImage = () => {
    html2canvas(document.getElementById('mainTable')).then((canvas) => {
      var base64image = canvas.toDataURL('image/png');
      var anchor = document.createElement('a');
      anchor.setAttribute('href', base64image);
      anchor.setAttribute('download', 'ExpensesData.png');
      anchor.click();
      anchor.remove();
    });
  };

  const rd = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(8)
      .substring(1);
  };
  const generateID = () => {
    return rd() + rd() + rd();
  };
  return (
    <div className={classes.centerPage}>
      <div className={classes.titleApp}>EXPENSES CLAIM APPLICATION</div>
      <Button
        variant="outlined"
        style={{
          marginTop: '20px',
        }}
        onClick={() => OnOpenAddNewTask()}
      >
        Add New Expenses
      </Button>
      <Button
        variant="outlined"
        style={{
          marginTop: '20px',
          marginLeft: '20px',
        }}
        onClick={() => ongenerate()}
      >
        Generate Data
      </Button>
      <TableContainer
        className={classes.mainTable}
        component={Paper}
        id="mainTable"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              className={classes.tableRow}
              style={{ background: 'gray' }}
            >
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                No.
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                Date
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                Description
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                Invoice No.
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                Amount ($)
              </TableCell>
              <TableCell
                className={classes.tableCell}
                align="center"
                style={{ color: 'white' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.length ? (
              <>
                {expenses.map((item, index) => (
                  <TableRow className={classes.tableRow} key={item.No}>
                    <TableCell className={classes.tableCell} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {item.Date}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {item.Description}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {item.InvoiceNo}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {item.Amount}
                    </TableCell>
                    <DeleteIcon
                      color="error"
                      style={{
                        marginTop: '10px',
                        marginLeft: '30px',
                        fontSize: '35px',
                        cursor: 'pointer',
                      }}
                      onClick={() => onDeleteItem(item.id)}
                    />
                  </TableRow>
                ))}
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell
                    className={classes.tableCell}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                  >
                    Total
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {totalAmount()}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <div>Expenses empty</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{
          marginTop: '10px',
        }}
        color="success"
        onClick={() => onExportToExcel()}
      >
        Export Expenses to Excel
      </Button>
      <Button
        variant="contained"
        style={{
          marginTop: '10px',
          marginLeft: '10px',
        }}
        color="secondary"
        onClick={() => onExportToImage()}
      >
        Export Expenses to Image
      </Button>
      <AddNewTask
        isShow={isShow}
        setIsShow={setIsShow}
        expenses={expenses}
        setExpenses={setExpenses}
        generateID={generateID}
      />
    </div>
  );
}
