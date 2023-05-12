const express = require('express')
const dashboard = require('../controllers/dashboard')
const router = express.Router()

router.post('/api/userdata', dashboard.userData)

router.post('/api/guildsdata', dashboard.guildsData)

router.post('/api/reactrolesdata', dashboard.reactRolesData)

router.post('/api/dashboardsendarray', dashboard.dashboardSend)

router.post('/api/dashboardsend', dashboard.dashboardSend2)

module.exports = router