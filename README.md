# Onyxium webapp

* Make sure you have the LTS of [Node.JS installed](https://nodejs.org/en/)

## Development

* Run 'npm install' to install all required dependencies.
* Run 'npm start' to spin up the development servers which listen to file changes.
* Visit http://localhost:3000/ to see the app running!

## Testing

* Run 'npm test' to run all unit/integration tests, this will return an error code when one of the tests fails.

## Building

* Run 'npm build' to create a production bundle.
* Files will present in the 'build' folder, located in the root of the project.

## Development API

* Calls made to url's starting /api/* are proxied to localhost:8080, make sure the API server is running on that host.
