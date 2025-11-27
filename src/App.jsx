// App.jsx
import { BrowserRouter as Router } from "react-router-dom";

import MainWebsite from "./components/MainWebsite";

function App() {
  return (
    <Router>
      <div className="App">
        <MainWebsite />
      </div>
    </Router>
  );
}

export default App;
