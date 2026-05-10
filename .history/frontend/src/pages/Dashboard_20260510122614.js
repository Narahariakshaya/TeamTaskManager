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
        `http://teamtaskmanager-production-607b.up.railway.app/api/tasks/${task._id}`,
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