import "./App.css";
import VerificationPage from "./VerificationPage";
import MainPage from "./MainPage";
import SingUpPage from "./SingUpPage"; // Import the SingUpPage component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/signup" element={<SingUpPage />} />{" "}
        <Route path="/login" element={<LoginPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
