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

        </div>
      ))
    }

  </div>
);