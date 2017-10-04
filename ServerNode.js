const express = require('express');
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function (req, res) {
  var response = "";
  response += '<a href="PlayAnimationSample.html">PlayAnimationSample.html</a><br/>';
  response += '<a href="RazerChromaSDKSampleApplication.html">RazerChromaSDKSampleApplication.html</a><br/>';
  res.send(response);
})

app.use(express.static('.'));

app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
})
