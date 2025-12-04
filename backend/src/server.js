import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express';
import { inngest } from './lib/inngest.js';
import {functions} from './lib/inngest.js';


const app = express();
const __dirname = path.resolve();
app.use(express.json());
// app.use(cors()) // devlopment style
app.use(cors({origin:ENV.CLIENT_URL,credentials:true})) // production style

app.use('/api/inngest',serve({client:inngest, functions}))




app.get('/books',(req,res)=>{
  res.json({message:"List of books"})
})

 
if(ENV.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  }) 
}

const startServer=async()=>{
  try{
    await connectDB();
    app.listen(ENV.PORT,()=>{
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})
  }catch(error){
     console.error("Error starting server:",error);
  }
}
startServer();