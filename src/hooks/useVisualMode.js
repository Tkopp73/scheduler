import { useState } from "react";

const useVisualMode = (initial, replace) => {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);


  //transitions the views
	const transition = (newMode, replace = false) => {
		if (replace) {
			setMode(newMode);
		} else if (!replace) {
      setHistory((prev) => [...prev, mode]);
			setMode(newMode);
		}
	};
  
  
  //returns to the previous view
	const back = () => {
    let num = history.length;
		if (num > 0) {
      setMode(history[num - 1]);
      const newHistory = [...history].pop();
      setHistory(newHistory);
		}
	};

	return { mode, transition, back };
};

export default useVisualMode;
