const express = require('express')
const router = express.Router()

router.route('/').get((req,res) => {
    res.render('../views/home')
})




module.exports = router
