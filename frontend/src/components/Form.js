import React, { useState } from "react";
import './Form.css'; 

function Form({ setUsername }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        age: Number(age),
        interests: interests.split(",").map(i => i.trim())
      }),
    });

    const data = await response.json();
    setUsername(data.name); 
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="form-stacked">
      <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input className="form-input" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
      <input className="form-input" value={interests} onChange={e => setInterests(e.target.value)} placeholder="Interests (comma separated)" required />
      <button className="form-button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default Form;
