import "./App.scss";
import { Fullscreen } from "./Pages/Fullscreen";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext/Authcontext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/movie"
            element={user ? <Home type="movie" /> : <Navigate to="/register" />}
          />
          <Route
            path="/series"
            element={
              user ? <Home type="series" /> : <Navigate to="/register" />
            }
          />
          <Route
            path="/watch"
            element={user ? <Fullscreen /> : <Navigate to="/register" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
