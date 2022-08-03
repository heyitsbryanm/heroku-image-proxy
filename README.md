# Heroku image proxy

This is a repo that you can use to proxy images on the web.

To use this:

1. Fork or clone this repo
1. Create a Heroku account: https://www.heroku.com/
2. Create a new Heroku app
3. For deployment method, choose **Github (Connect to Github)**
4. Connect it to the forked/cloned repo
5. Under your app settings in Heroku, look for **Config Vars**
6. Add a new entry:
   - KEY: `BASEURL`, VALUE: `https://DOMAIN_URL` (Ex: `https://mydomain.example.com`)
      - For the `DOMAIN_URL`, you should use the domain with the assets to proxy. For example, if I wanted to proxy this image (`http://bryansandbox.example_domain.net/_static/images/img02.jpg`), I would use VALUE: `http://bryansandbox.example_domain.net/`
7. Click **Deploy** in Heroku -> Deploy your `master` or `main` branch
8. Wait for it to deploy


Once you're done, you can test this by:

1. Go to **Settings** in the Heroku app
2. Scroll down to **Domains**
3. Copy your domain (ex: `https://your-app-name.herokuapp.com/`)
4. Type in the path of your proxied URL
   1. Using the examples above, if the original URL is `http://bryansandbox.example_domain.net/_static/images/img02.jpg`, you should use https://your-app-name.herokuapp.com/_static/images/img02.jpg
5. If that is an image, it should display

# Configuring with imgix

After you've confirmed that your images are being proxied, you can begin using it with imgix.

To start, follow this tutorial:
https://docs.imgix.com/setup/creating-sources/web-folder

For the **Base URL** field in your Source settings, you should use your Heroku URL (`https://your-app-name.herokuapp.com/`).

# Todo's

- [ ] Use a proxy library such as `http-proxy-middleware` instead of using `requests`
- [ ] Add options for configuring the header responses and requests