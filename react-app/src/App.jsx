import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RootMain from "./pages/main/RootMain";
import MapComponent from "./pages/main/map.jsx"
import AppRouter from "./components/AppRouter.jsx";

function App() {
  return (
    <AppRouter/>
  );
}

export default App;
