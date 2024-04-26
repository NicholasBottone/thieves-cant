import { ChangeEvent, useState } from "react";
import "./App.css";

import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

import DragonBody from "./assets/dragon-body.png";
import DragonHead from "./assets/dragon-head.png";
import DragonTail from "./assets/dragon-tail.png";

import { translateToEnglish, translateToThievesCant } from "./utils/translate";

type Result = {
  translation: string;
  translationPairs: { start: string; end: string }[];
};

function App() {
  const [translatingFromLanguage, setTranslatingFromLanguage] = useState<
    "thieves' cant" | "english"
  >("english");
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState<Result>();

  const translatingToLanguage =
    translatingFromLanguage === "english" ? "thieves' cant" : "english";

  /**
   * Handler for input text area changes.
   */
  const handleInputTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (translatingFromLanguage === "english") {
      setOutput(translateToThievesCant(inputText));
    } else {
      setOutput(translateToEnglish(inputText));
    }
  };

  /**
   * Handler for switching the language to be translated.
   */
  const handleSwitchLanguages = () => {
    setTranslatingFromLanguage(translatingToLanguage);
    setInputText(output?.translation ?? "");
    if (translatingFromLanguage === "english") {
      setOutput(translateToThievesCant(inputText));
    } else {
      setOutput(translateToEnglish(inputText));
    }
  };

  /**
   * Handler for clearing the input text.
   */
  const handleClearTextClick = () => {
    setInputText("");
    setOutput(undefined);
  };

  return (
    <>
      <div className="header">
        <h1>Thieves&apos; Cant</h1>
      </div>

      <div className="translation-container">
        <img id="dragon-head" src={DragonHead} />
        <img id="dragon-body" src={DragonBody} />
        <img id="dragon-tail" src={DragonTail} />
        <div className="translation-header-container">
          <div className="left-header">{translatingFromLanguage}</div>
          <div className="middle-header">
            <FaArrowRightArrowLeft onClick={handleSwitchLanguages} />
          </div>
          <div className="right-header">{translatingToLanguage}</div>
        </div>
        <div className="translation-box-container">
          <div className="translation-box" id="box-from">
            <textarea
              placeholder="Enter text here..."
              value={inputText}
              onChange={handleInputTextChange}
              className="input-text-area"
            />
            {inputText && (
              <MdClear
                className="clear-icon"
                size={24}
                onClick={handleClearTextClick}
              />
            )}
          </div>
          <div className="translation-box" id="box-to">
            <p className="output-text-area">{output?.translation}</p>
          </div>
        </div>
      </div>

      {/* <div className="rules-container">Rules</div> */}
    </>
  );
}

export default App;
