import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  centerPage: {
    marginTop: '50px',
    margin: '0 auto',
    width: '800px',
  },
  titleApp: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  mainTable: {
    marginTop: '10px',
  },
  tableRow: {
    height: '50px',
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  tableCell: {
    border: '1px solid rgba(224, 224, 224, 1)',
    textAlign: 'center',
  },
}));
