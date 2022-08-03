const express = require('express');
const app = express();
const request = require('request')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();

// define this in your .env or your environment variables
const baseUrl = process.env.BASEURL

app.get('/', (req, res) => {
    res.status(200).send('Homepage')
})

app.get('/*', (req, res) => {

    let url = baseUrl + req.originalUrl;
    console.log(url)

    // proxy the request and send it
    request({
        url: url,
        encoding: null
    },
        (err, resp, buffer) => {
            if (!err && resp.statusCode === 200) {
                // if we get a 200 response
                res.set(resp.headers)
                // sets the haeders;
                res.send(resp.body);
            } else {
                // if error. You can customise this error here.
                res.status(resp?.statusCode).send(resp?.statusMessage)
            }
        });

})

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT || 3000} - Dir name is ${__dirname}`))