const express = require('express'),
		  app = express();

require('dotenv').config();


app.get('/', (req, res) => res.send('I am Pliny! I will help you find my tasty beer!'));

app.listen(3000, () => console.log(`Example app listening on port ${process.env.PORT}!`));