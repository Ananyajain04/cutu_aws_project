import { useState, useEffect } from "react";
import LetterBox from "../components/letterbox";
import { swiftWords } from "../data/words";
import Leaderboard from "../components/leaderboard";
import { submitScore } from "../services/scoreService"; // ✅ Add this

const GamePage = ({ theme }) => {
  const [randomWord, setRandomWord] = useState("");
  const [correctcount, setCorrectCount] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [inputs, setInputs] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill(""))
  );
  const [letterStatus, setLetterStatus] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill(null))
  );

  const [showLeaderboard, setShowLeaderboard] = useState(false); // ✅ Show Leaderboard Modal

  useEffect(() => {
    const selectedWord =
      swiftWords[Math.floor(Math.random() * swiftWords.length)];
    setRandomWord(selectedWord.toUpperCase());
  }, []);

  const handleLetterChange = (rowIndex, colIndex) => (newValue) => {
    const newInputs = [...inputs];
    newInputs[rowIndex][colIndex] = newValue.value;
    setInputs(newInputs);
  };

  const checkWord = () => {
    const currentRow = inputs[activeRow];
    const newLetterStatus = Array(5).fill(null);
    const wordArray = randomWord.split("");
    let count = 0;
    let nc = 0;

    for (let i = 0; i < 5; i++) {
      if (currentRow[i] === "") nc = 1;
    }

    for (let i = 0; i < 5 && nc == 0; i++) {
      if (currentRow[i] === wordArray[i]) {
        newLetterStatus[i] = "correct";
        wordArray[i] = null;
        count++;
      }
    }

    for (let i = 0; i < 5 && nc == 0; i++) {
      if (
        newLetterStatus[i] !== "correct" &&
        wordArray.includes(currentRow[i])
      ) {
        newLetterStatus[i] = "wrong-position";
        wordArray[wordArray.indexOf(currentRow[i])] = null;
      } else if (newLetterStatus[i] !== "correct") {
        newLetterStatus[i] = "incorrect";
      }
    }

    const updatedLetterStatus = [...letterStatus];
    updatedLetterStatus[activeRow] = newLetterStatus;
    setLetterStatus(updatedLetterStatus);
    setCorrectCount(count);

    if (activeRow < 5 && nc == 0) {
      setActiveRow(activeRow + 1);
    }
  };

  useEffect(() => {
    if (correctcount == 5) {
      document.getElementById("changeifwon").textContent = "Congrats!";
      // ✅ Submit score when user wins
      submitScore(randomWord, activeRow).then(() => {
        setShowLeaderboard(true); // ✅ Auto-open leaderboard
      });
    }
  }, [correctcount]);

  let rows = [[], [], [], [], [], []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      let setValue;

      switch (j) {
        case 0:
          setValue = "one";
          break;
        case 1:
          setValue = "two";
          break;
        case 2:
          setValue = "three";
          break;
        case 3:
          setValue = "four";
          break;
        case 4:
          setValue = "five";
          break;
        default:
          setValue = "unknown";
      }
      rows[i].push(
        <LetterBox
          value={inputs[i][j]}
          className={setValue}
          disabled={activeRow !== i}
          onChange={handleLetterChange(i, j)}
          status={letterStatus[i][j]}
          theme={theme}
        />
      );
    }
  }

  return (
    <>
      <div className="flex flex-col h-[92vh] w-screen justify-center items-center">
        <div
          id="maingame"
          className="h-[100%] w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${theme.bg_url})` }}
        >
          <fieldset
            id="fieldgame"
            className="p-[20px] border-[5px] rounded-[20px] w-[30vw]"
            style={{ borderColour: theme.light_bg_colour }}
          >
            <h1 id="changeifwon">Swiftie at Test</h1>

            {correctcount === 5 && (
              <button
                onClick={() => setShowLeaderboard(true)}
                className="mb-3 underline text-sm"
                style={{ color: theme.lighter_bg_colour }}
              >
                View Leaderboard
              </button>
            )}

            <div id="top">
              {rows.map((row, i) => (
                <div
                  className="flex flex-row justify-center items-center gap-[10px] m-[10px]"
                  key={i}
                >
                  {row}
                </div>
              ))}
            </div>

            <div id="bottom">
              <button
                className="px-[24px] py-[16px] rounded-[10px]"
                style={{
                  color: theme.light_bg_colour,
                  backgroundColor: theme.darker_bg_colour,
                }}
                onClick={checkWord}
                disabled={activeRow > 5}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </div>
      </div>

      {/* ✅ Leaderboard Modal */}
      {showLeaderboard && (
        <Leaderboard
          word={randomWord}
          onClose={() => setShowLeaderboard(false)}
          theme={theme}
        />
      )}
    </>
  );
};

export default GamePage;
