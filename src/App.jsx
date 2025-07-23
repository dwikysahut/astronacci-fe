import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
import Auth from "./page/auth/Auth";
import Home from "./page/home/Home";
import AuthGuard from "./helpers/AuthGuard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
