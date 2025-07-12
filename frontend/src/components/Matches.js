import React, { useEffect, useState } from "react";
import "./Matches.css";

function Matches({ username }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/matches/${username}`)
      .then(res => res.json())
      .then(data => setMatches(data));
  }, [username]);

  const handleShortlist = async (matchName) => {
    try {
      await fetch(`http://localhost:3001/users/${username}/shortlist`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchName }),
      });
      alert(`${matchName} shortlisted!`);
    } catch (err) {
      alert("Failed to shortlist user.");
    }
  };

  return (
    <div>
      <h2>Matches for {username}</h2>
      {matches.map((m, index) => (
        <div key={index} className="match-container">
          <strong>{m.name}</strong>: {m.interests.join(", ")}
          <button
            className="shortlist-button"
            onClick={() => handleShortlist(m.name)}
          >
            Shortlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default Matches;
