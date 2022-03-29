const express = require('express')
const router = express.Router()
const { getSession, createNewSession, updateSession, deleteSession } = require('../models/session')

router.get('/:sessionId', async (req, res) => {
    let results
    try {
        results = await getSession(req.params.sessionId)
        if (!results) {
            return res.status(404).send({message: 'Session with this ID does not exist.'})
        }
    } catch(e) {
        console.error(e)
        return res.status(500).send({message:'There has been an error. Please try again.'})
    }
    return res.status(200).json(results)
})

router.post('/:sessionId', async (req, res) => {
    try {
        await createNewSession(req.params.sessionId, req.body.sessionPassword, req.body.hostId, req.body.params)
    } catch(e) {
        console.error(e)
        return res.status(500).send('There has been an error. Please try again.')
    }
    console.log(`Session with id ${req.params.sessionId} created successfully`)
    return res.status(201).send({sessionId: req.params.sessionId, message: 'Session created successfully', params: req.body.params })
})

router.put('/:sessionId', async (req, res) => {
    try {
        await updateSession(req.params.sessionId, req.body.params)
    } catch(e) {
       console.error(e)
       return res.status(500).send('There has been an error. Please try again.')
    }
    return res.status(201).send({ sessionId: req.params.sessionId, message: 'Session update successfully', newParams: req.body.params })
})

router.delete('/:sessionId', async (req, res) => {
    try {
        await deleteSession(req.params.sessionId)
    } catch(e) {
       console.error(e)
       return res.status(500).send('There has been an error. Please try again.')
    }
    return res.status(200).send({ sessionId: req.params.sessionId, message: 'Session deleted successfully', newParams: req.body.params })
})

module.exports = router