import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// Conexión base de datos

//const uri = 'mongodb://localhost:27017/mevn';

// Conexión en la nube

const uri = 'mongodb+srv://mevn:kR9NYHZen3DqSl85@cluster0-dihw3.mongodb.net/mevn?retryWrites=true&w=majority';

const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(  
  () => { console.log('Conectado a MongoDB') },
  err => { err }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/api', require('./routes/nota'));
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});