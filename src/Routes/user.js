const express = require('express');
const user = require('../controllers/user')
const router = express.Router();
router.get('/v1/usersList', user.getUsersList);
router.post('/v1/addUser', user.addUser)
router.delete('/v1/deleteUser/:userId', user.deleteUser)
module.exports = router;    