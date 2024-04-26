import { useState } from "react";
import "./App.css";

import { translateToEnglish, translateToThievesCant } from "./utils/translate";

function App() {
  const [input, setInput] = useState("");

  return (
    <>
      <h1>Thieve&rsquo;s Cant Translator</h1>
      <input
        type="textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setInput(translateToEnglish(input))}>
        Translate to English
      </button>
      <button onClick={() => setInput(translateToThievesCant(input))}>
        Translate to Thieve&rsquo;s Cant
      </button>
      <button onClick={() => setInput("")}>Clear</button>
    </>
  );
}

export default App;
