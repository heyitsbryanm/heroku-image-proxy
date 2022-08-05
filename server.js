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
            if (!err && resp.statusCode === 200 && resp?.headers?.["content-type"] !== "text/html") {
                // sets the haeders. We can consider not passing any headers too.
                res.set(resp.headers)
                res.send(resp.body);
            } else {
                // if error. You can customise this error here.
                console.log(resp)
                if(resp?.headers?.["content-type"] !== "text/html" && resp.statusCode === 200) {
                    // if we get an HTML page back with a `200` response, we likely do not want to cache that. So, we'll return an error and log it.
                    console.error(resp)
                    res.status(503).send('Error fetching an image.')
                } else {
                    // otherwise, pass the error message over
                    res.status(resp?.statusCode).send(resp?.statusMessage)
                }
            }
        });

})

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT || 3000} - Dir name is ${__dirname}`))