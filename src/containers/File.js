import Dropzone from '../components/Dropzone.js';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles (theme => ({
  form: {
    minWidth: 650,
    minHeight: 300,
  }
}));

const File = () => {
  const classes = useStyles();
  return (
    <Box m={4}>
      <Box display="flex" m={2} justify="flex-start">
        <Button
          variant="contained"
          component={Link}
          to="/"
        >
          戻る
        </Button>
      </Box>

      <Box className={classes.form} component={Paper}>
        <Dropzone/>
      </Box>
    </Box>
  );
}

export default File;