const express= require('express');
const app=express();
const userRouter=require('./routes/userRoute');
const cors=require('cors');
const  corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


require('dotenv').config();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/users',userRouter);
const PORT = process.env.PORT || undefined;
const mongoose=require('./config/dbConfig');


app.listen(PORT, ()=>console.log(`server is listening on ${PORT}`));
