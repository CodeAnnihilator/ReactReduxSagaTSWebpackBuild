import express from 'express';
import path from 'path';
import {port, prefix} from '../config/main';

const app = express();

const rootPath = path.join(__dirname, '../');

app.use('/app', express.static(rootPath + 'dist'));

app.get('*', (req, res) => {
  res.sendFile(rootPath + 'dist/index.html')
});

app.listen(port);