const { getVotes, vote, updateVote, deleteVote } = require('../../app/models/vote')
const expect = require('chai').expect

const TESTING_VOTE1 = {
    sessionId: 'sessionId',
    voteId: 'voteId',
    userId: 'userId',
    voteValue: 3
}
const TESTING_VOTE2 = {
    sessionId: 'sessionId2',
    voteId: 'voteId2',
    userId: 'userId2',
    voteValue: 2
}
const TESTING_VOTE3 = {
    sessionId: 'sessionId',
    voteId: 'voteId3',
    userId: 'userId2',
    voteValue: 1
}

describe('Vote interface functions', () => {
    describe('create new votes', () => {
        it('create new vote 1', async () => {
            let resp = await vote(TESTING_VOTE1.sessionId, TESTING_VOTE1.voteId, TESTING_VOTE1.userId, TESTING_VOTE1.voteValue)
            expect(resp.rowCount).to.equal(1)
        })
        it('create new vote 2', async () => {
            let resp = await vote(TESTING_VOTE2.sessionId, TESTING_VOTE2.voteId, TESTING_VOTE2.userId, TESTING_VOTE2.voteValue)
            expect(resp.rowCount).to.equal(1)
        })
        it('create new vote 3', async () => {
            let resp = await vote(TESTING_VOTE3.sessionId, TESTING_VOTE3.voteId, TESTING_VOTE3.userId, TESTING_VOTE3.voteValue)
            expect(resp.rowCount).to.equal(1)
        })
    })

    describe('get multiple votes', () => {
        it('get votes', async () => {
            let resp = await getVotes(TESTING_VOTE1.sessionId)
            expect(resp.length).to.equal(2)
        })
    })

    TESTING_VOTE2.voteValue = 4

    describe('update vote', () => {
        it('update vote', async () => {
            let resp = await updateVote(TESTING_VOTE2.sessionId, TESTING_VOTE2.voteId, TESTING_VOTE2.userId, TESTING_VOTE2.voteValue)
            expect(resp.rowCount).to.equal(1)
        })
        it('get updated vote', async () => {
                let resp = await getVotes(TESTING_VOTE2.sessionId)
                expect(resp.length).to.equal(1)
                expect(resp[0].vote_id).to.equal(TESTING_VOTE2.voteId)
                expect(resp[0].session_id).to.equal(TESTING_VOTE2.sessionId)
                expect(resp[0].user_id).to.equal(TESTING_VOTE2.userId)
                expect(resp[0].vote_value).to.equal(TESTING_VOTE2.voteValue)
            })
    })

    describe('delete vote in session 2', () => {
        it('delete vote 1', async () => {
            let resp = await deleteVote(TESTING_VOTE2.sessionId, TESTING_VOTE2.voteId, TESTING_VOTE2.userId)
            expect(resp.rowCount).to.equal(1)
        })

        it('lookup the deleted vote in session 2', async () => {
            let resp = await getVotes(TESTING_VOTE2.sessionId)
            expect(resp).to.equal(undefined)
        })
    })

    describe('delete vote in session 1', () => {
        it('delete vote 1', async () => {
            let resp = await deleteVote(TESTING_VOTE1.sessionId, TESTING_VOTE1.voteId, TESTING_VOTE1.userId)
            expect(resp.rowCount).to.equal(1)
        })

        it('delete vote 3', async () => {
            let resp = await deleteVote(TESTING_VOTE3.sessionId, TESTING_VOTE3.voteId, TESTING_VOTE3.userId)
            expect(resp.rowCount).to.equal(1)
        })
    })

})