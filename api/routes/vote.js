const express = require('express')
const router = express.Router()
const { getVotes, vote, updateVote } = require('../models/vote')

router.get('/:sessionId', async (req, res) => {
    let results
    try {
        results = await getVotes(req.params.sessionId)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(200).send(results)
})

router.post('/:sessionId', async (req,res) => {
    try {
        await vote(req.params.sessionId, req.body.voteId, req.body.userId, req.body.voteValue)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(201).send('Vote added successfully')
})

router.put('/:sessionId', async (req, res) => {
    try {
        await updateVote(req.params.sessionId, req.body.voteId, req.body.userId, req.body.voteValue)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There was an error. Please try again.')
    }
    return res.status(201).send('Vote updated successfully')
})

module.exports = router