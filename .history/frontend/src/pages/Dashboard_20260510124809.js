import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

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

      const token = localStorage.getItem("token");

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

      const token = localStorage.getItem("token");

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

      <form onSubmit={createTask} className="form-container">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Create Task
        </button>

      </form>

      <br />
      <hr />
      <br />

      {
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Priority: {task.priority}</p>

            <p>Status: {task.status}</p>

            <button
  onClick={async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://teamtaskmanager-production-607b.up.railway.app/api/tasks/${task._id}`,
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
  }}
>
  Mark Done
</button>



          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;