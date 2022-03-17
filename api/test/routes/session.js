const { expect } = require("chai")
const request = require("request")

const URL = 'http://localhost:4000'

describe('Session API endpoints', () => {
    describe('Select not existing session' ,() => {
        it('404 response code', () => {
            request(`${URL}/session/abcd`, (_error, response) => {
                expect(response.statusCode).to.equal(404)
            })
        })
    })

    describe('Create session' ,() => {
        it('201 response code', () => {
            request.post({
                url: `${URL}/session/test_session_id`,
                form: { hostId: 'test_host', params: {a: 1, b:'test_params'} }
            }, (_error, response) => {
                expect(response.statusCode).to.equal(201)
            })
        })
    })


    describe('Get existing session', () => {
        it('200 response code', () => {
            request(`${URL}/session/test_session_id`, (_error, response) => {
                expect(response.statusCode).to.equal(200)
            })
        })
    })
})