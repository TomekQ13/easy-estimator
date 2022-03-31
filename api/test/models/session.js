const { getSession, createNewSession, updateSession, deleteSession } = require('../../app/models/session')
const expect = require('chai').expect

const TESTING_SESSION = {
    sessionId: 'testSession',
    hostId: 'testHost',
    password: 'testPassword',
    testParams: {a: "1", b:'test param', c: ['1','2','3','4','5'], d: { aa:'1', bb:'2', c:['abc', 'dedasdasd'] }}
}

describe("Session interface functions", async () => {    
    describe("createNewSession", () => {        
        it("create a correct session with params", async () => {
            await deleteSession(TESTING_SESSION.sessionId)
            const resp = await createNewSession(TESTING_SESSION.sessionId, TESTING_SESSION.hostId, TESTING_SESSION.password, TESTING_SESSION.testParams)
            expect(resp.rowCount).to.equal(1)
        })
    })
    
    describe("get existing session", ()=> {           
        it("fetched session is equal to the created one", async () => {      
            const  session = await getSession(TESTING_SESSION.sessionId)          
            expect(session.sessionid).to.equal(TESTING_SESSION.sessionId)        
            expect(session.hostid).to.equal(TESTING_SESSION.hostId)     
            expect(session.params).to.deep.equal(TESTING_SESSION.testParams)          
            expect(session.password).to.deep.equal(TESTING_SESSION.password)
        })
    })

    TESTING_SESSION.testParams = { a: 'updated params', b: '1122', c: ['1','2','3','4','5'], d:{} }

    describe("update Session", ()=> {
        it("update existing session", async () => {
            let updateResp = await updateSession(TESTING_SESSION.sessionId, TESTING_SESSION.testParams)
            // await console.log(updateResp)
            expect(updateResp.rowCount).to.equal(1)
        })

        it('check session values after update', async () => {
            let updatedSession = await getSession(TESTING_SESSION.sessionId)
            expect(updatedSession.sessionid).to.equal(TESTING_SESSION.sessionId)
            expect(updatedSession.hostid).to.equal(TESTING_SESSION.hostId)
            expect(updatedSession.params).to.deep.equal(TESTING_SESSION.testParams)
        })
    })

    describe("deleteTestSession", () => {
        it("delete the previously created testing session", async () => {
            let resp = await deleteSession(TESTING_SESSION.sessionId)
            expect(resp.rowCount).to.equal(1)
        })

        it('try to get session after deletion', async () => {
            let session = await getSession(TESTING_SESSION.sessionId)
            expect(session).to.equal(undefined)
        })
    })

})
