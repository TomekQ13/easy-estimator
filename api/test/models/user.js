const { createUser, getUser, deleteUser } = require('../../app/models/user')
const expect = require('chai').expect

const TESTING_USER = {
    userId: 'testUserId',
    username: 'testUsername',
}

describe('Testing user interface functions', () => {
    describe('Delete testing user if exsists', () => {
        it('Row count 0 or 1', async () => {
            const resp = await deleteUser(TESTING_USER.userId)
            expect(resp.rowCount).to.be.oneOf([0,1])
        })
    })

    describe('Create a user', () => {
        it('Row count 1', async () => {
            const resp = await createUser(TESTING_USER.userId, TESTING_USER.username)
            expect(resp.rowCount).to.equal(1)
        })
    })

    describe('Get existing user', () => {
        it('Username equal to the testing user', async () => {
            const resp = await getUser(TESTING_USER.userId)
            expect(resp.username).to.equal(TESTING_USER.username)
        })
    })

    describe('Get not existing user', () => {
        it('Resp equal undefined', async () => {
            const resp = await getUser('asdasddsda')
            expect(resp).to.equal(undefined)
        })
    })

    describe('Delete testing user', () => {
        it('Row count equal 1', async () => {
            const resp = await deleteUser(TESTING_USER.userId)
            expect(resp.rowCount).to.equal(1)
        })
    })
})