import Header from './containers/layout/HeaderContainer.js';
import AWS from 'aws-sdk';
import Home from './containers/Home.js';
import File from './containers/File.js';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import './App.css';
require('dotenv').config()

const AWS_ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;
// const BUCKET = process.env.REACT_APP_AWS_SECRET_KEY;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

function App() {
  return (
    <div className="App">
      <Header />
      <Box m={4}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact key={'show'} path="/file" component={File}/>
          <Route exact key={'new'} path="/file/create" component={File}/>
        </Switch>
      </Box>
    </div>
  );
}

export default App;
