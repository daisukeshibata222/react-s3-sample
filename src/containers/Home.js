import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FileCopy from '@material-ui/icons/FileCopy';
// import axios from 'axios';
// import AWS from 'aws-sdk';

const useStyles = makeStyles (theme => ({
  table: {
    minWidth: 650,
  },
}));

const createData = (fileName, storedAt, byte) => {
  return {
    fileName, storedAt, byte
  };
}

const rows = [
  createData('a.text', "2020-12-01 00:00:00", '12GB'),
  createData('b.text', "2020-12-02 00:00:00", '10GB'),
  createData('c.text', "2020-12-03 00:00:00", '2GB'),
  createData('d.text', "2020-12-04 00:00:00", '8GB'),
  createData('e.text', "2020-12-05 00:00:00", '4GB'),
]

const Home = () => {
  const classes = useStyles();
  return (
    <Box m={4}>
      <Box display="flex" m={2} justify="flex-start">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/file/create"
        >
          新規登録
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ファイル名</TableCell>
              <TableCell>登録日</TableCell>
              <TableCell>容量</TableCell>
              <TableCell align="right">ダウンロード</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.fileName}>
                <TableCell component="th" scope="row">
                  {row.fileName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.storedAt}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.byte}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Link to="/file/download">
                    <FileCopy/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Home;