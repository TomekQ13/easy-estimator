const { expect } = require("chai")
const request = require("request")
const chai = require('chai')
// Import the dependencies for testing
const chaiHttp = require('chai-http')
const app = require( '../../app/app')
// Configure chai
chai.use(chaiHttp);
chai.should()

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
        it('201 response code', (done) => {
            chai.request(app)
                .post(`/session/test_session_id`,)
                .type('form')
                .send({
                    hostId: 'test_host',
                    sessionPassword: '',
                    params: {a: 1, b:'test_params'}
                })
                .end((_err, res) => {
                    // res.should.have.status(201)
                    expect(res.statusCode).to.equal(201)
                    done()
                })
        })
    })


    // describe('Get existing session', () => {
    //     it('200 response code', () => {
    //         request(`${URL}/session/test_session_id`, (_error, response) => {
    //             expect(response.statusCode).to.equal(200)
    //         })
    //     })
    // })
})