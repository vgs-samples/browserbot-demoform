const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const dbRoute = require('./config/key').mongoURI;
const mongoose = require("mongoose");
const User = require('./User');
var path = require("path");

mongoose
  .connect(dbRoute, { useNewUrlParser: true})
  .then(() => console.log("Connect to MongoDB successfully!"))
  .catch(err => console.log(err));

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/submit', (req, res) => {
  console.log(req.body);

  const recaptcha = req.body.recaptcha;

  const options = {
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=6LeqNdEUAAAAAABvdjG5hft4NGJTz--sQJV7Rhyi&response=${recaptcha}`
  }
  request(options, function(err, response, body){
    if(err){
      console.log(err);
    } 
    body = JSON.parse(body);
    if (body.success === undefined || !body.success){
      res.json(
        'recaptcha failed!'
      );
    } else {
      console.log('recaptcha verified!');
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: Date()
      });

      newUser.save(function(err) {
        if (err) {
          console.log('error storing new user:', err);
        } else {
          User.find({}, function(err, users){
            if (err) {
              console.log('error retriving all users', err);
            } else {
              res.json(users);
            }
          });
        }
      });
    }
  })
});

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));