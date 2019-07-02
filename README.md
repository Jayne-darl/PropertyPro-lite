# PropertyPro-lite
[![Build Status](https://travis-ci.com/Jayne-darl/PropertyPro-lite.svg?branch=develop)](https://travis-ci.com/Jayne-darl/PropertyPro-lite)
[![Coverage Status](https://coveralls.io/repos/github/Jayne-darl/PropertyPro-lite/badge.svg?branch=develop)](https://coveralls.io/github/Jayne-darl/PropertyPro-lite?branch=develop)
[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://github.com/Jayne-darl/PropertyPro-lite/blob/develop/LICENSE)

A web-based platform where people create and/or search for properties for sale or rent

## Features
* Users can create an account and login.
* Users(agent) can post a new property advert.
* Users(agent) can update details of property advert.
* Users(agent) can update status of property advert.
* Users(agent) can delete a property advert.
* Users can view all property adverts.
* Users can view all property adverts of a specific type.
* Users can view details of a property advert.

## Tools used in Project Creation
* HTML & CSS
* Node.js & Express.
* Eslint.
* Mocha, Chai & NYC for testing.
* Babel(To transpire down from ES6 to ES5).
* Travis CI, and Coveralls

## Requirements and Installation
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

To install and run this project you would need to have installed:
* Git
* Node 

To run: 

``` 
$ git clone https://github.com/Jayne-darl/PropertyPro-lite.git
$ cd PropertyPro-lite
$ npm install
$ npm start 
```

 For Testing Purpose, run: 
 ``` 
 $ npm test
 ```

## HTTP Request Methods

These are the HTTP request methods used in this project.

| Method	| Action |
| --- | --- |
| `GET` |	This method is used to get a resource|
| `POST`	| This method is used to create a resource or send data |
| `PATCH`	| This method is used to update a resource |
| `DELETE`	| This method is used to delete a resource |

## HTTP Response Status Codes

These are the HTTP response codes used in this project.

| Status Codes | Indication |
| --- | --- |
| `200` |	This OK status code indicates that a request has succeeded |
| `201` |	This created status code indicates that a resource has been created |
| `400` |	This bad request error status code indicates that the request sent to the server is incorrect |
| `401` | The access credentials (via the Authorization header) were missing or are invalid |
| `403` | The credentials you provided are valid, but you are not authorized to access the resource you were looking for |
| `404` |	Returned when the request is valid, but the resource you try to access does not exist, or is outside your scope |
| `422` |  Unprocessable Entity, it indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions |
| `500` |	This internal server error status code indicates that something has gone wrong on the web server |

## API Endpoints
| Endpoint |	Functionality |
| --- | --- |
| POST /api/v1/auth/create | Create a new account |
| POST /api/v1/auth/login | Log into account |
| POST /api/v1/property | Create a property advert|
| GET /api/v1/property |	Fetch all property adverts |
| GET /api/v1/property?type=query |	Fetch all property adverts of the same type |
| GET /api/v1/property/:id	| Fetch a specific property advert |
| PATCH /api/v1/property/:id |	Update details of a specific property advert |
| PATCH /api/v1/property/:id/sold|	Update status of a specific property advert |
| DELETE /api/v1/property/:id|	Delete a specific property advert |


## Templater User Interface(UI)
https://jayne-darl.github.io/PropertyPro-lite/UI/index.html

## Relevant Pivotal Tracker Stories
https://www.pivotaltracker.com/n/projects/2355130

## The API Endpints are hosted on heroku

## The API Endpoints are documented on Apiary

## Author
Jane U. Onwumere

## License
This is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).
