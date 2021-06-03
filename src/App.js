import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DangNhapPage from "./pages/DangNhapPage";
import DangKiPage from "./pages/DangKiPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Route path="/dang-nhap" exact component={DangNhapPage}></Route>
      <Route path="/dang-ki" exact component={DangKiPage}></Route>
      <Route path="/" exact component={HomePage}></Route>
    </BrowserRouter>
  );
}

export default App;
