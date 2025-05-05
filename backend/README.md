# Backend API

## Installation

### Locally

1. Clone this repo
2. Navigate to the `backend` folder in your terminal
3. Run `npm install`
4. Run `npm run dev`
5. Access the server docs by visiting `http://localhost:3000/docs` in your browser

### In a Docker Image

If you're having problems running the api in your machine, you can try using docker to run the server instead by following these instructions:

1. Ensure docker is installed
2. Clone this repo
3. Navigate to the `backend` folder in your terminal
4. Run `docker build -t temp-image . && docker run -d --rm temp-image`
5. Access the server docs by visiting `http://localhost:3000/docs` in your browser

## Implementation Notes

1. The OTP is set to a constant default value of `1234`
2. You will find all the API endpoints and body fields in the API swagger documentation `http://localhost:3000/docs`
3. The API is very simple, and has no field validations except for OTP
