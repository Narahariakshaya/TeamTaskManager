function Register() {
  return (

  <div className="auth-container">

    <form className="auth-form">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Login
      </button>

    </form>

  </div>

);
}