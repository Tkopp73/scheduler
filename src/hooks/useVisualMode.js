import { useState} from "react";


const useVisualMode = (initial, replace) => {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

const transition = (newMode, replace=false) => {
  if (history[0] === mode || replace === true) {
    setMode(newMode);
  } else if (replace === false) {
    setHistory((prev) => ([...prev, mode]));
    setMode(newMode);
  }
}

const back = () => {
  let num = history.length;
  if (num > 0) {
    setMode(history[num - 1]);
    history.pop();
  }
}

return {mode, transition, back}
};

export default useVisualMode ;
