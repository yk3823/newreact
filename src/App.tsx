import "./App.css";
import VerificationPage from "./VerificationPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/verify" element={<VerificationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
