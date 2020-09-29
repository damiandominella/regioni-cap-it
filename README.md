# Regioni - CAP - IT

A simple REST API service that retrieves:

- **the list of zip codes (CAP) of a given region name**
- **the regione name given a zip code (CAP)**

Examples:

- `Marche` --> `61041`,`63095`,`63075`,`60020`,`63824`...
- `61041` --> `Marche`

## Motivation

Because in 2020 there's no Italian official service that gives you this simple information.
I needed this service in order to display the region name for the registered users in an application, because during the registration of the address we only asked the CAP.

## Tech/framework used

- Written in javascript and built with [Express](https://expressjs.com/]).
- Dataset is a json (`data.json`) offered by [this guy](https://github.com/matteocontrini/comuni-json) and it is currently updated at `01/01/2020`

## Features

- [x] Get all zip codes (CAP) of a region
- [x] Get the region name of a zip code (CAP)

## API Reference

There are 2 available endpoints:

- `GET /region2cap?region=_REGION_`
- `GET /cap2region?cap=_CAP_`

In each request you can pass the argument as query string parameter.

#### Examples

##### Region 2 CAP

`GET /region2cap?region=Basilicata`

```json
{
  "success": true,
  "count": 131,
  "data": [
    "85010",
    "75011",
    "85011",
    "85010",
    "75010",
    ...
  ]
}
```

##### CAP 2 Region

`GET /cap2region?cap=47838`

```json
{ "success": true, "cap": "85010", "region": "Basilicata" }
```

## Usage

Service is currently hosted on [Heroku](https://heroku.com) and available for free at [this url](https://regioni-cap-it.herokuapp.com/). 

If you are willing to use this service, consider to make a little donation in order to keep the service up & running. You can do it by **sponsoring** this repository or [just clicking here](https://www.paypal.me/damiandominella). Thanks!

## Installation & Development

If you want to host the service yourself or try it locally, follow the next steps:

1. Clone the repository
    `git clone git@github.com:damiandominella/regioni-cap-it.git`

2. Navigate to the directory where you downloaded the project
    `cd regioni-cap-it`

3. Install the dependencies
   `npm install`

4. Start the application
   `npm run start`

5. Navigate to http://127.0.0.1:3000

### Tests

Tests are written using [jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest) and you can run them with: `npm test`

## Credits

Dataset credits: https://github.com/matteocontrini/comuni-json
