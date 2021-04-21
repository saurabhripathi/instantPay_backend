const tasks = require('../models/task')
const users = require('../models/user')

// add task in db //
const addTask = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await users.findOne({ userId: userId })
        if (user) {
            const task = new tasks({
                ...req.body,
                owner: user._id
            })
            const doc = await task.save()
            if (doc) {
                const tempUser = await user.populate('tasks').execPopulate()
                await users.updateOne(
                    { userId: userId },
                    { $addToSet: { tasksList: tempUser.tasks } }
                );
            }
            res.status(201).send({ message: "success" })
        } else {
            res.status(404).send({ message: "User not exist" })
        }
    }
    catch (e) {
        res.status(500).send({ error: "server error" })
    }
}

// delete task /
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const task = await tasks.findOne({ taskId: taskId })
        if (task) {
            const result = await tasks.deleteOne({ taskId: taskId })
            if (!result) {
                res.status(404).send()
            }
            res.status(200).send({ message: "success" })
        } else {
            res.status(404).send({ message: "Task is not present." })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ error: 'server error' })
    }
}
// edit task /
const editTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const updatedName = req.body.name
        const result = await tasks.findOneAndUpdate({taskId: taskId},{name:updatedName})
        res.status(200).send({message: "success"})
    } catch (e) {
        res.status(500).send({message: "Task is not updated"})
    }
}


module.exports = {
    addTask, deleteTask, editTask
}