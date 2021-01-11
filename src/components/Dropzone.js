import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API;

const useStyles = makeStyles (theme => ({
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
  },
  files: {
    listStyle: 'none',
  },
  upButton: {
    color: "secondary",
    margin: theme.spacing(3),
  },
}));

const Dropzone = (props) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [openDlg, setOpenDlg] = useState(false);
  const [dlgTitle, setDlgTitle] = useState('');
  const [dlgContent, setDlgContent] = useState('');

  const classes = useStyles();

  const onDrop = acceptedFiles => {
    setFiles(files => files.concat(...acceptedFiles));
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    maxSize: 1024*1024*1024*10
  });

  const fileNames = files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const disabled_button = (files.length === 0 || uploading === true);

  const onUpload = () => {
    setUploading(true);
    Promise.all(files.map(file => uploadFile(file)))
      .then(files => {
        setDlgTitle('ファイルアップロード');
        setDlgContent('のアップロードが完了しました。');
        setOpenDlg(true);
        setUploading(false);
      }).catch(e => {
        setDlgTitle('ファイルアップロード');
        setDlgContent('のアップロードが失敗しました。');
        setOpenDlg(true);
        setUploading(false);
        console.log(e);
      });
  }

  const closeHundle = (event) => {
    if (openDlg === true && (!event.keyCode || event.keyCode === 13 || event.keyCode === 27)) {
      setOpenDlg(false);
      setFiles([]);
    }
  }

  const uploadFile = (file) => {
    const params = {
      'filename': file.name,
      'filetype': file.type,
    };
    const options = {
      headers: {'Content-Type': 'application/json'}
    }
    axios.post(API_URL+'/files', params, options)
    .then(res => {
      const body = JSON.parse(res.data.body);
      const presigned_url = body.presigned_url;
      const file_options = {
        headers: {
          'Content-Type': file.type
        }
      };
      axios.put(presigned_url, file, file_options);
    }).catch(e => console.log(e));
  }

  return (
    <div className="App">
      <section className="container">
        <div {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()}/>
          <p>
            ここにファイルをドラッグ＆ドロップ
            <br />
            もしくは、クリックして選択
          </p>
        </div>
        <aside>
          <h4>ファイル</h4>
          <ul className={classes.files}>{fileNames}</ul>
        </aside>
        <Button onClick={onUpload} variant="outlined" color="primary" disabled={disabled_button} className={classes.upButton} startIcon={<CloudUploadIcon />} >Upload</Button>
        <Dialog open={openDlg} onKeyDown={closeHundle}>
          <DialogTitle>{dlgTitle}</DialogTitle>
          <DialogContent>
            {fileNames}
            <br/>
            {dlgContent}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeHundle}>OK</Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
}

export default Dropzone;