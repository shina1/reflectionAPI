//Success is not final; failure is not fatal: It is the courage to continue that counts. -- Winston S. Churchill


import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';

import ReflectionWithJsObject from './src/useJSOject/controllers/ReflectionControler';
import ReflectionWithDB from './src/useD/cotrollers/reflection';
import UserWithDb from './src/useD/cotrollers/User';
import Auth from './src/useD/middleware/Auth';


dotenv.config();

const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;

const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    return res.status(200).send({
        'message': 'YAY!, Congratulations! Your first endpoint is working'
    });
});
// end points for handlig reflections
app.post('/api/v1/reflections',Auth.verifyToken,Reflection.create);
app.get('/api/v1/reflections',Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id',Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id',Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id',Auth.verifyToken, Reflection.delete);
// endpoints for user
app.post('/api/v1/users', UserWithDb.create);
app.get('/api/v1/users/login', UserWithDb.login);
app.get('/api/v1/users', UserWithDb.getAll);
app.delete('/api/v1/users/me',Auth.verifyToken, UserWithDb.delete);


// server
app.listen(3500);

console.log('app running on port ', 3500);