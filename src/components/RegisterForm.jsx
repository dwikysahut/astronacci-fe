import React, { useState } from "react";

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    membershipType: "A",
    provider: "manual",
    socialId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, provider: "manual" });
    onRegister(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        type="email"
        className="border p-2 w-full"
        required
      />

      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={handleChange}
        type="tel"
        className="border p-2 w-full"
        required
      />

      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        type="password"
        className="border p-2 w-full"
      />

      <select
        name="membershipType"
        value={form.membershipType}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      >
        <option value="A">Membership A</option>
        <option value="B">Membership B</option>
        <option value="C">Membership C</option>
      </select>

      {form.provider !== "manual" && (
        <input
          name="socialId"
          placeholder="Social ID"
          value={form.socialId}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      )}

      <button type="submit" className="bg-gray-500 text-white p-2 w-full">
        Register
      </button>
    </form>
  );
}
