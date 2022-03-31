const request = require("request")
const chai = require('chai')
const expect = chai.expect
// Import the dependencies for testing
const chaiHttp = require('chai-http')
const app = require( '../../app/app')
// Configure chai
chai.use(chaiHttp);
chai.should()

const URL = 'http://localhost:4000'
const TESTING_SESSION = {
    sessionId: 'testSessionIntegration',
    hostId: 'testHostIntegration',
    sessionPassword: 'testPasswordIntegration',
    params: {a: '1', b:'test param', c: ['1','2','3','4','5'], d: { aa:'1', bb:'2', c:['abc', 'dedasdasd'] }}
}

describe('Session API endpoints', () => {
    describe('Select not existing session' ,() => {
        it('404 response code', () => {
            request(`${URL}/session/abcd`, (_error, response) => {
                expect(response.statusCode).to.equal(404)
            })
        })
    })

    describe('Create session' ,() => {
        it('deleting the session if it exists from previous runs', (done) => {
            chai.request(app)
            .delete(`/session/${TESTING_SESSION.sessionId}`)
            .end((_err, res) => {
                expect(res.status).to.be.oneOf([200, 404])
                done()
            })
        })


        it('201 response code', (done) => {
            chai.request(app)
            .post(`/session/${TESTING_SESSION.sessionId}`)
            .type('form')
            .send({
                hostId: TESTING_SESSION.hostId,
                sessionPassword: TESTING_SESSION.sessionPassword,
                params: TESTING_SESSION.params
            })
            .end((_err, res) => {
                expect(res).to.have.status(201)                
                done()

            })
        })
    })

    describe('Get existing session', () => {
        it('fetched session is equal to created session', (done) => {    
            chai.request(app)
            .get(`/session/${TESTING_SESSION.sessionId}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.sessionid).to.equal(TESTING_SESSION.sessionId)
                expect(res.body.hostid).to.equal(TESTING_SESSION.hostId)
                expect(res.body.params).to.deep.equal(TESTING_SESSION.params)
                expect(res.body.password).to.equal(TESTING_SESSION.sessionPassword)
                done()
            })
        })   

    })
})