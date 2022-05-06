import "./App.css";
import Todolist from "./page/Todolist";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEraser, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

library.add(faEraser);
library.add(faX);
library.add(faCheck);

function App() {
  return (
    <>
      <Todolist />
      <ToastContainer />
    </>
  );
}

export default App;
