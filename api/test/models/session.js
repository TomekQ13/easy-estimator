const { getSession, createNewSession, updateSession } = require('../../app/models/session')
const expect = require('chai').expect

const TESTING_SESSION = {
    sessionId: 'testSession',
    hostId: 'testHost',
    testParams: {a: 1, b:'test param'}
}

describe("Session interface functions", () => {
    describe("createNewSession", () => {
        it("create a correct session with params", async () => {
            await createNewSession(TESTING_SESSION.sessionId, TESTING_SESSION.hostId, JSON.stringify(TESTING_SESSION.testParams))

        })
    })


    describe("getSession", ()=> {
        it("get existing session", () => {
            let session = await getSession('testSession')
            expect(session.sessionID).to.equal(TESTING_SESSION.sessionId)
            expect(session.hostId).to.equal(TESTING_SESSION.hostId)
            expect(session.params).to.deep.equal(TESTING_SESSION.params)
        })
    })
})
