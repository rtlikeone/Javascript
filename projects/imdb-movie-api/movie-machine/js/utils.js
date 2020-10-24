// Helper function -> performs part of the computation of another function.
const debounce = (func, delay = 1000) => {
  let setTimeOutID;

  return (...args) => {
    console.log("ARGS: ", args);
    // Delay fetchData. Only after 1000ms of no keypress will the fetchData() run.
    if (setTimeOutID) {
      clearTimeout(setTimeOutID);
    }

    setTimeOutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
