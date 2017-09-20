const express = require('express');
const app = express();

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
