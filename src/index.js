import app from './app'
import {connect} from './database'
import config from './config';

const start = async () => {
    try {

      connect();
      app.listen(config.port, () => {
        console.log("Connect to database succesfully");
        console.log(`REST API on ${config.port}`);
      });
    } catch (e) {
      console.error(e);
    }
  };
  
  start();