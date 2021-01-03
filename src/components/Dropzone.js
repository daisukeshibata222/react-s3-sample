import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
        setUploading(false);
      }).catch(e => console.log(e));
  }

  const uploadFile = (file) => {
    const params = {
      'filename': file.name,
      'filetype': file.type,
    };
    const options = {
      headers: {'Content-Type': 'application/json'}
    }
    return axios.put(
      API_URL+'/files', params, options)
      .then(res => {
        const img_options = {
          headers: {
            'Content-Type': file.type
          }
        };
        return axios.put(res.data.file_upload_url, file, img_options);
      });
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
      </section>
    </div>
  );
}

export default Dropzone;