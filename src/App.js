import logo from "./logo.svg";
import "./App.css";
import Todolist from "./page/Todolist";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEraser, faX, faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faEraser);
library.add(faX);
library.add(faCheck);

function App() {
  return (
    <>
      <Todolist />
    </>
  );
}

export default App;
