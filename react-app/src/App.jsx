import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RootMain from "./pages/main/RootMain";
// import MapComponent from "./pages/main/map.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/*" element={<RootMain />} />
        {/* <Route path="/map" element={<MapComponent />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
