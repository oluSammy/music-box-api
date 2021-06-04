import express from 'express';
import usersRoute from './users'

const router = express.Router()

router.get('/', (req, res) => {
    res.send("music-box server is live")
})

router.use('/users', usersRoute)

export default router