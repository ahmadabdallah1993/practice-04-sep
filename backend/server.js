'use strict';

const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
const axios = require('axios');
require('dotenv').config();

const mongoose = require('mongoose');  //import after install it


const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/301d35-cat', {useNewUrlParser: true, useUnifiedTopology: true}); //connect to our database, 301d35-cat is the name of db, mongodb://localhost:27017/ this is the url for our mongose server, 27017 is the port for mongose


const kittySchema = new mongoose.Schema({  //Schema is the object structure
    name: String,
    breed: String,
  });

 const KittenModel = mongoose.model('Kitten', kittySchema); //compile the schema into a model


 const usersSchema = new mongoose.Schema({  //Schema is the object structure
    name: String,
    age: Number,
  });

 const Users = mongoose.model('Users', usersSchema); //compile the schema into a model



 // seed data (insert initial data)
 async function seedData() {
  const firstCat = new KittenModel({
    name: 'fluffy',
    breed: 'angora'
  })

  const secondCat = new KittenModel({
    name: 'Frankie',
    breed: 'American'
  })

  const thirdCat = new KittenModel({
    name: 'Blakky',
    breed: 'British'
  })

  await firstCat.save();
  await secondCat.save();
  await thirdCat.save();

 }

//  seedData();

server.get('/getCat', getCatHandler)

function getCatHandler(req,res) {
  //we will take the data from the database and send it to the user
  KittenModel.find({},(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      // console.log(result)
      res.send(result)
    }
  })
}


server.listen(PORT, () =>{
    console.log(`hello i am listening to this ${PORT} port`)
})
