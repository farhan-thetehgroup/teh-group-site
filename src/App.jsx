// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import MainWebsite from "./components/MainWebsite";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}>
      <Router>
        <div className="App">
          <MainWebsite />
        </div>
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
