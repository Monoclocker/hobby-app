import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RootMain from "./pages/main/RootMain";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/*" element={<RootMain />} />
      </Routes>
    </Router>
  );
}

export default App;
