# Fixed Dashboard.js Code

Replace your complete `frontend/src/pages/Dashboard.js` file with this code.

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://teamtaskmanager-production-607b.up.railway.app/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        title,
        description,
        priority,
        status,
      };

      await axios.post(
        "https://teamtaskmanager-production-607b.up.railway.app/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created Successfully");

      setTitle("");
      setDescription("");
      setPriority("");
      setStatus("");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Task Creation Failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://teamtaskmanager-production-607b.up.railway.app/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Deleted Successfully");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <div
        style={{
          width: "400px",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button type="submit">Create Task</button>
        </form>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Task List</h2>

        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
```

# After Replacing Code

Run these commands in terminal:

```bash
git add .
git commit -m "fixed dashboard create task"
git push
```

Then:

1. Open Vercel
2. Wait until deployment becomes `Ready`
3. Refresh website
4. Login again
5. Create task

Now task creation and task display should work correctly.
