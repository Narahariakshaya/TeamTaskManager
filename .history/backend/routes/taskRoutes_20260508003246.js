const router = require("express").Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

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

module.exports = router;