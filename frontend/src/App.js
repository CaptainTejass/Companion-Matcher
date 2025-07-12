import React from "react";
import Form from "./components/Form";
import Matches from "./components/Matches";

function App() {
  const [username, setUsername] = React.useState("");

  return (
    <div>
      <h1>Companion Matcher</h1>
      <Form setUsername={setUsername} />
      {username && <Matches username={username} />}
    </div>
  );
}

export default App;
