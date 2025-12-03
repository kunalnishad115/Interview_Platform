import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
// import { connect } from 'http2';
import { connectDB } from './lib/db.js';
const app = express();

const __dirname = path.resolve();


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