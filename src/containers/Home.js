import React, { useState, useEffect } from "react";
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
import axios from 'axios';

const API_URL = process.env.REACT_APP_API;

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

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const Home = (props) => {
  const [rows, setRows] = useState({ hits: [] });

  useEffect(() => {
    const options = {
      headers: {'Content-Type': 'application/json'}
    }
     axios.get(API_URL+'/files', options)
      .then((res) => {
        const results = res.data.body;
        const datas = results.map((result) => {
          return createData(result['Key'], result['LastModified'], bytesToSize(result['Size']))
        });
        setRows({hits: datas});
      }).catch((e) => {
        console.log(e);
        setRows({hits: []})
      })
  }, []);

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
            {rows.hits.map((row) => (
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