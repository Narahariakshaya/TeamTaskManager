import "./Dashboard.css";

import { useEffect, useState } from "react";

import axios from "axios";

function Dashboard() {

  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "/";
  }

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://teamtaskmanager-production-607b.up.railway.app/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://teamtaskmanager-production-607b.up.railway.app/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        priority: "",
        status: ""
      });

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://teamtaskmanager-production-607b.up.railway.app/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const markDone = async (id) => {

    try {

      await axios.put(
        `http://teamtaskmanager-production-607b.up.railway.app/api/tasks/${id}`,
        {
          status: "Done"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  fetchTasks();

}, []);

  return (

    <div className="dashboard">

      <h1>Dashboard</h1>

      <button
        onClick={() => {

          localStorage.removeItem("token");

          window.location.href = "/";
        }}
      >
        Logout
      </button>

      <form
        onSubmit={createTask}
        className="form-container"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />

        <button type="submit">
          Create Task
        </button>

      </form>

      {
        tasks.map((task) => (

          <div
            key={task._id}
            className="task-card"
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Priority: {task.priority}
            </p>

            <p>
              Status: {task.status}
            </p>

            <button
              onClick={() => markDone(task._id)}
            >
              Mark Done
            </button>

            <button
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;