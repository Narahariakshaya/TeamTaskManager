const router = require("express").Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const task = new Task(req.body);

        await task.save();

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
        .populate("assignedTo", "name email");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;