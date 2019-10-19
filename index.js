function validator(validator, toValidate) {
    return function (req, res, next) {
        let error
        if (toValidate === undefined) {
            error = validator.validate(req.body).error
        } else {
            error = validator.validate(toValidate).error
        }
        if (error) {
            next(error)
        } else {
            next()
        }
    }
}

module.exports = validator