const express = require('express')
const router = express.Router()
const { getVotes, vote, updateOrCreateVote, deleteVote, deleteVotes } = require('../models/vote')
const { authenticateToken } = require('../auth')

router.use(authenticateToken)

router.get('/:sessionId', async (req, res) => {
    let results
    try {
        results = await getVotes(req.params.sessionId)
        if (!results) {
            res.status(404).send({
                message: `No votes found for the session id ${req.params.sessionId}`
            })
        }
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(200).send(results)
})

router.post('/:sessionId', async (req,res) => {
    try {
        await vote(req.body.voteid, req.params.sessionId, req.body.userid, req.body.votevalue)
    } catch(e) {
        console.error(e)
        return res.status(500).json({message: 'There was an error. Please try again.'})
    }
    return res.status(201).json({message: 'Vote added successfully'})
})

router.put('/:sessionId', async (req, res) => {
    try {
        await updateOrCreateVote(req.params.sessionId, req.body.voteid, req.body.userid, req.body.votevalue)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(201).send('Vote updated successfully')
})

router.delete('/all/:sessionId', async (req, res) => {
    console.log('deleting votoes for' + req.params.sessionId)
    try {
        await deleteVotes(req.params.sessionId)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(200).json({
        message: `Votes for sessionId ${req.params.sessionId} deleted successfully.`
    })
})

router.delete('/one/:voteId', async (req, res) => {
    try {
        const resp = await deleteVote(req.params.voteId)
        if(resp.rowCount === 0) {
            return res.status(404).json({
                message: `Vote with voteId ${req.params.voteId} not found.`
            })
        }
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(200).json({
        message: `Vote with voteId ${req.params.voteId} deleted successfully.`
    })
})


module.exports = router