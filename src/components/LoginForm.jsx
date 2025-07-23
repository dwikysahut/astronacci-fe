import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        type="email"
        className="border p-2 w-full"
      />
      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        type="password"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 w-full">
        Login
      </button>
    </form>
  );
}
