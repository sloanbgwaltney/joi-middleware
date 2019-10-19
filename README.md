# @sloang/joi-middleware

> A validation middleware for expressjs using Joi.

Remove validation from your controllers and put them into your middleware.

## Usage

```js
const express = require('express')
const app = express()

const joiMiddleware = require('@sloang/joi-middleware')
const joiValidationObject = require('[path the validation object]')

app.post('/', joiMiddleware(joiValidationObject), (req, res, next) => {
    res.status(200).send('It Works')
})

app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        res.status(400).send('Validation Error')
    }
})

```

outputs

On valid validation
```
It Works
```

On failed validation
```
Validation Error
```

## API

```js
let joiMiddleware = require('@sloang/joi-middleware')
```

`joiMiddlware(validationObject)`


When joiMiddleware is called only with the Joi validationObject it defaults to validating `req.body` you can validate other objects by using `joiMiddleware(validationObject, object)`. If validation fails next is called with the validation error as its argument. Otherwise next is called with no argument

`joiMiddleware(validationObject, object)`

When using this method you are providing the middleware both the Joi validation object and the object to be validated. If validation fails next is called with the validation error as its argument. Otherwise next is called with no argument. This method can be useful when trying to validate other request object keys. For example 
```js
const router = require('express').Router()
let joiMiddleware = require('@sloang/joi-middleware')

router.post('/test', 
(req, res, next) => 
    joiMiddleware(userValidator, req.user)(req, res, next))
``` 

### Important Note

Joi is technically not specifically required for this middleware to work. Any validation package that has a `.validate` method that returns an object with an error key (`{error}`) when the object is invalid should in theory work for this middleware, however, Joi is used in test and should always be functional with this package.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install @sloang/joi-middleware @hapi/joi
```

## See Also

- [`@hapi/joi`](https://www.npmjs.com/package/@hapi/joi)
- [`express`](https://www.npmjs.com/package/express)
- [`How express middleware works`](https://expressjs.com/en/guide/using-middleware.html)

## License

MIT

