const chai = require('chai')
const expect = chai.expect
// Import the dependencies for testing
const chaiHttp = require('chai-http')
const app = require( '../../app/app')
// Configure chai
chai.use(chaiHttp);
chai.should()

const TESTING_VOTE1 = {
    sessionId: 'sessionIdIntegration',
    voteId: 'voteIdInt',
    userId: 'userIdInt',
    voteValue: "3"
}
const TESTING_VOTE2 = {
    sessionId: 'sessionId2Integration',
    voteId: 'voteId2Int',
    userId: 'userId2Int',
    voteValue: "2"
}
const TESTING_VOTE3 = {
    sessionId: 'sessionIdIntegration',
    voteId: 'voteId3Int',
    userId: 'userId2Int',
    voteValue: "1"
}


describe('Vote API endpoints', () => {
    describe('Delete testing votes for a clean start', () => {
        it(`Return code 200 or 404 for ${TESTING_VOTE1.voteId}`, (done) => {
            chai.request(app)
            .delete(`/vote/${TESTING_VOTE1.voteId}`)
            .end((_err, res) => {
                expect(res.status).to.be.oneOf([200, 404])
                done()
            })
        })
        it(`Return code 200 or 404 for ${TESTING_VOTE2.voteId}`, (done) => {
            chai.request(app)
            .delete(`/vote/${TESTING_VOTE2.voteId}`)
            .end((_err, res) => {
                expect(res.status).to.be.oneOf([200, 404])
                done()
            })
        })
        it(`Return code 200 or 404 for ${TESTING_VOTE3.voteId}`, (done) => {
            chai.request(app)
            .delete(`/vote/${TESTING_VOTE3.voteId}`)
            .end((_err, res) => {
                expect(res.status).to.be.oneOf([200, 404])
                done()
            })
        })
    })

    describe('Get vote for not existing session', () => {
        it('Return code 404', (done) => {
            chai.request(app)
            .get('/vote/abcd')
            .end((_err, res) => {
                expect(res).to.have.status(404)
                done()
            })
        })
    })

    describe('Create testing votes', () => {
        describe('Create a first vote for session sessionIdIntegration', () => {
            it('Return code 200', (done) => {
                chai.request(app)
                .post(`/vote/${TESTING_VOTE1.sessionId}`)
                .end((_err, res) => {
                    expect(res).to.gave.status(200)
                    done()
                })
            })
        })
    
        describe('Create a second vote for session sessionIdIntegration', () => {
            it('Return code 200', (done) => {
                chai.request(app)
                .post(`/vote/${TESTING_VOTE3.sessionId}`)
                .end((_err, res) => {
                    expect(res).to.gave.status(200)
                    done()
                })
            })
        })
    
        describe('Create a first vote for session sessionId2Integration', () => {
            it('Return code 200', (done) => {
                chai.request(app)
                .post(`/vote/${TESTING_VOTE2.sessionId}`)
                .end((_err, res) => {
                    expect(res).to.gave.status(200)
                    done()
                })
            })
        })
    })

    

    describe('Get the two votes for sessionIdIntegration', () => {
        it('Should return two votes', (done) => {
            chai.request(app)
            .get(`/vote/${TESTING_VOTE1.sessionId}`)
            .end((_err, res) => {
                expect(res).to.have.length(2)
                done()
            })
        })
    })


})