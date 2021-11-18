import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 

import router from './routes/routes.js'

const app = express(); 
const PORT = 5000; 

//Cors violation stuff 
app.use(cors()); 

//MiddleWare
app.use(express.urlencoded({extended:true})); 
app.use(express.json({extended:true})); 

app.use('/names', router); 

//Connect to mongoDB and start up server 
const URL = 'mongodb+srv://cpete:ang123!@cluster0.nyfpb.mongodb.net/pingPong?retryWrites=true&w=majority'; 
const connectionParams = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
mongoose.connect(URL, connectionParams)
    .then( () => { 
        console.log('Db is connected'); 

        //Start the express server 
        app.listen(PORT, () => {
            console.log('Server at http:localhost:5000'); 
        })
    })
    .catch(err => { 
        console.log(`Error setting up mongoose: \n${err}`);
    })