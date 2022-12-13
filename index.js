const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('DB Connected!');
})
.catch(err => {
  console.log(err.message)
});

const port = process.env.PORT || 8080;
app.listen(port)

console.log('server listen port', port)
