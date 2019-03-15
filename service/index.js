import { createServer } from 'http';
import app from './config/express';

createServer(app).listen(3001, () => {
    console.log('Servidor estutando na porta: 3001');
});

//this.address().port
