import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Components/Layout";
import AuthPage from "./pages/AuthPage";
import NeedAuth from "./Components/NeedAuth";
import useAutoLogout from "./hooks/useAutoLogout";
function App() {
  useAutoLogout();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="profile"
          element={
            <NeedAuth>
              <ProfilePage />
            </NeedAuth>
          }
        />
        <Route path="authform" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
