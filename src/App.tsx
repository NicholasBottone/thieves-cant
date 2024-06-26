import { ChangeEvent, useState } from "react";

import { FaArrowRightArrowLeft, FaGithub } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

import DragonBody from "./assets/dragon-body.png";
import DragonHead from "./assets/dragon-head.png";
import DragonTail from "./assets/dragon-tail.png";

import { translateToEnglish, translateToThievesCant } from "./utils/translate";
import type { Result } from "./utils/result";

// @ts-expect-error - ReactSpoiler is not typed
import ReactSpoiler from "react-spoiler";

function App() {
  const [highlightWordIndex, setHighlightWordIndex] = useState<number>();
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
      setOutput(translateToThievesCant(e.target.value));
    } else {
      setOutput(translateToEnglish(e.target.value));
    }
  };

  /**
   * Handler for switching the language to be translated.
   */
  const handleSwitchLanguages = () => {
    setTranslatingFromLanguage(translatingToLanguage);
    setInputText(output?.translation ?? "");
    if (translatingToLanguage === "english") {
      setOutput(translateToThievesCant(output?.translation ?? ""));
    } else {
      setOutput(translateToEnglish(output?.translation ?? ""));
    }
  };

  /**
   * Handler for clearing the input text.
   */
  const handleClearTextClick = () => {
    setInputText("");
    setOutput(undefined);
  };

  const highlightColorCodes = ["#f18676", "#e8ba59"]; //, "#B42F1B", "#40B41B", "#1B88B4"];

  return (
    <>
      <div className="header">
        <h1> </h1>
        <h1>Thieves&apos; Cant Translator</h1>
        <a href="https://github.com/NicholasBottone/thieves-cant">
          <FaGithub color="#718c7e" size={30} />
        </a>
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
            <div className="translation-text-container">
              <textarea
                placeholder="Enter text here..."
                value={inputText}
                onChange={handleInputTextChange}
                className="input-text-area"
              />
              {inputText && (
                <div className="text-display">
                  {output?.translationPairs.map(({ start: word }, index) => (
                    <>
                      <span
                        key={index}
                        className="word-span"
                        onMouseEnter={() => setHighlightWordIndex(index)}
                        onMouseLeave={() => setHighlightWordIndex(undefined)}
                        style={{
                          backgroundColor:
                            highlightWordIndex === index
                              ? highlightColorCodes[
                                  index % highlightColorCodes.length
                                ]
                              : "transparent",
                        }}
                      >
                        {word.toLowerCase()}
                      </span>{" "}
                    </>
                  ))}
                </div>
              )}
            </div>
            {inputText && (
              <MdClear
                className="clear-icon"
                size={24}
                onClick={handleClearTextClick}
              />
            )}
          </div>
          <div className="translation-box" id="box-to">
            <p className="output-text-area">
              {output?.translationPairs.map((word, index) => (
                <>
                  <span
                    key={index}
                    style={{
                      backgroundColor:
                        highlightWordIndex === index
                          ? highlightColorCodes[
                              index % highlightColorCodes.length
                            ]
                          : "transparent",
                    }}
                  >
                    {word.end.toLowerCase()}
                  </span>{" "}
                </>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="rules-container">
        <div className="rules-header-container">
          <h2>Rules</h2>
        </div>
        <div className="rules-content-container">
          <ReactSpoiler
            blur={5}
            hoverBlur={3}
            style={{
              cursor: "pointer",
            }}
          >
            <strong>Pronouns: </strong>Pronouns are mapped to the following:
            <ul>
              <li>I/Me → HUUUE</li>
              <li>You/Yours → HIII</li>
              <li>He/Him → HEEE</li>
              <li>She/Her → HAAA</li>
              <li>It/This/That → HYOH</li>
              <li>We/Us → HOOO</li>
              <li>They/Them → HYUH</li>
            </ul>
            <strong>Words With One Syllable: </strong>Add the letter “Y” before
            the one syllable word, then take the first letter and move it to the
            end.
            <br />
            <br />
            <strong>Words With Multiple Syllable: </strong>
            <ol>
              <li>
                Take first syllable and find English word that contains it
              </li>
              <li>
                Give vowel filler to indicate how many syllables are left in
                original word. Vowel filler: A = 1, E = 2, C = 3 ...
              </li>
              <li>
                Find English word for every other syllable unless it is the last
                one, in which case it is always the last syllable
              </li>
              <li>The new encoded words must have more than one syllable</li>
            </ol>
            <strong>Contractions: </strong>Thieves&apos; cant does not support
            contractions. Expand all contractions to their unabbreviated forms.
          </ReactSpoiler>
        </div>
      </div>
    </>
  );
}

export default App;
