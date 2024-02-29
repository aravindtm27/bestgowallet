import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import Dashboard from "./pages/dashboard/dashboard";
import Signup from "./pages/signup/signup";
import Signin from "./pages/signin/signin";
import Send from "./pages/send/send";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />}/>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='send' element={<Send />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
