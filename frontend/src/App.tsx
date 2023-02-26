import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/Game/Game";
import LoginForm from "./components/User/LoginForm";
import CreateUserForm from "./components/User/CreateUserForm";
import NavBar from "./components/NavBar/NavBar";
import { Provider } from "react-redux/es/exports";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/character" element={<CreateUserForm />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
