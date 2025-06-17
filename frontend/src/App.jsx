import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/InteraksiUser/login";
// import Register from "./pages/User/register";

import DashboardUser from "./pages/User/dashboard";
import AlatUser from "./pages/User/alatUser";
import PinjamanUser from "./pages/User/pinjamanUser";
import RiwayatUser from "./pages/User/riwayatUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<DashboardUser />} />
      <Route path="/alatUser" element={<AlatUser />} />
      <Route path="/peminjaman" element={<PinjamanUser />} />
      <Route path="/riwayat" element={<RiwayatUser />} />
    </Routes>
  );
}

export default App;
