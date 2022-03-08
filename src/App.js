import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import HomePage from "./components/HomePage/HomePage";

/*
Login information :
stjepan@test.com
ante@test.com
mateja@test.com
Password:123456
*/

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home-page" element={<HomePage />} />
      {authCtx.isLoggedIn && (
        <Route path="*" element={<Navigate to="/home-page" />} />
      )}
      {!authCtx.isLoggedIn && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
