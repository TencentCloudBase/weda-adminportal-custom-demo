import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./routes/login";
import MircoApp from "./routes/micro-app";
import './index.css'

const rootElement = document.getElementById("root");
render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/login" element={<Login />} />
        <Route path="/app/:id/*" element={<MircoApp />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </HashRouter>,
  rootElement
);