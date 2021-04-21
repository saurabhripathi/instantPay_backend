const users = require('../models/user')
const tasks = require('../models/task')

// to get all users list //
const getUsersList = async (req, res) => {
    try {
        const data = await users.find({});
        res.status(200).send({data,message: "success"});
    }
    catch (e) {
        res.status(500).send({ error: 'server error' })
    }
}

// to add user in db //
const addUser = async (req, res) => {
    try {
        console.log(req.body)
        const data = new users(req.body)
        const doc = await data.save()
        res.status(201).send({ message: "success" })
    }
    catch (e) {
        res.status(500).send({ error: 'server error' })
    }
}

// delete user //
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await users.findOne({ userId: userId })
        if (user) {
            const result = await users.deleteOne({ userId: userId })
            const taskRemoves = await tasks.deleteMany({owner: user._id}) 
            if (!result || !taskRemoves) {
                res.status(404).send()
            }
            res.status(200).send({ message: "success" })
        } else {
            res.status(404).send({ message: "User not present" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ error: 'server error' })
    }

}

module.exports = {
    getUsersList, addUser, deleteUser
}