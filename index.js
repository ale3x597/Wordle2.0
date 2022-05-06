const axios = require("axios").default;
const PORT = 8000;
const expr = require("express");
const cors = require("cors");
require('dotenv').config();
const app = expr();

app.use(cors());

app.get('/word', (req, res)=>{
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '3'},
        headers: {
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data);
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error);
      })
})

app.get ('/check', (req, res)=>{
  const word = req.query.word

  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: {entry: word},
    headers: {
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY
    }
  };
  
  axios.request(options).then((response) => {
    console.log(response.data);
    res.json(response.data.result_msg)
  }).catch( (error) => {
    console.error(error);
  });
})



app.listen(PORT, ()=> console.log('Server is running on port'+PORT));

