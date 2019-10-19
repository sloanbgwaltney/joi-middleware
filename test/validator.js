const validator = require('../index')
const Joi = require('@hapi/joi')
const {expect} = require('chai')

describe('Validator Test', () => {
    let validate
    let req
    beforeEach(() => {
        validate = Joi.object({test: Joi.string().required()})
        req = {}
    })

    it('Will call next with no args if valid', (done) => {
        req.body = {test: 'Hello World'}
        validator(validate)(req, {}, (err) => {
            expect(err).to.eql(undefined)
            done()
        })
    })

    it('Will call next with arg if not valid', (done) => {
        req.body = {red: 'dead'}
        validator(validate)(req, {}, (err) => {
            expect(err).to.not.eql(null)
            expect(err).to.not.eql(undefined)
            done()
        })
    })

    it('Can validate outside of req.body', (done) => {
        const testValidate = {red: 'dead'}
        validator(validate, testValidate)(req, {}, (err) => {
            expect(err).to.not.eql(null)
            expect(err).to.not.eql(undefined)
            done()
        })
    })

    afterEach(() => {
        validate = null
        req = null
    })

})