# HBaaS
**H**eadless **B**rowser **a**s **a** **S**ervice (HBaaS) is a microservice for providing headless browser functionality like
- Converting a webpage into a PDF or 
- Full-Page-Screenshotting a webpage or
- Exporting the rendered DOM of a webpage

as a service.


Note: This is a FHTW project focussing on fullfilling as many factors of the [Twelve Factor App](https://12factor.net/) as possible and does not claim to be feature-complete. For the implementation status of the twelve factors see `./factors.md`.


## Usage with docker
- run `docker run -p 8080:8080 -it $(docker build -q .)` to build the image and instantly run it
- open `http://localhost:8080` (or whatever port you configured using the HBAAS_PORT environmental variable) in your browser to see some example requests

## Usage without docker
requires a current version of npm and node (tested with node@16.13.0 and npm@8.1.0)
- for developing run `npm install && npm run dev`
- for building for production run `npm install && npm run build`
- for starting the production build run `npm start`

