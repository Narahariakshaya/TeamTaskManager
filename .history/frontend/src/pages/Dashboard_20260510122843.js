import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Dashboard</h1>

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

                  await axios.delete(
                    `http://localhost:5000/api/tasks/${task._id}`,
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
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;