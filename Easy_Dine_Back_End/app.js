const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

require('dotenv/config');

//middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


//ROUTES
app.get('/', (req, res) =>{
	res.send('we are on home');
});


mongoose.set('useUnifiedTopology', true);
//connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
	 { useNewUrlParser: true },
	 () => console.log('connected to DB!)'));


//server boot
app.listen(3000);