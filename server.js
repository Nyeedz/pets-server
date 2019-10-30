const express = require('express');
const request = require('request');
const cors = require('cors')
const cronJob = require('cron').CronJob;
const app = express();

const cronPatterns = {
  3: '0 0 */3 * * *',
  6: '0 0 */6 * * *',
  9: '0 0 */9 * * *',
  12: '0 0 0*12 * * *',
  24: '0 0 0*24 * * *',
  teste: '0 */1 * * * *'
};

let teste = null;
app.use(cors())

const activateServo = () => {
  request.get('http://192.168.15.32', (error, response, body) => {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

app.get('/timer', (req, res) => {
  const pattern = cronPatterns[req.query.interval];

  console.log(req.query.interval);
  console.log(pattern);

  teste = teste
    ? null
    : new cronJob(
        pattern,
        () => {
          console.log('You will see this message every second');
          activateServo();
        },
        null,
        true,
        'America/Los_Angeles'
      );

  res.json({ status: 'success' });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
