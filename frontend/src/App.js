import "./App.css";
import { AuthenContext } from "./Component/Login/AuthenContext";
import { Main } from "./Component/Main";

function App() {

  return (
    <div className="App ">
      <AuthenContext>
      <Main/>
      </AuthenContext>
    </div>
  );
}

export default App;
