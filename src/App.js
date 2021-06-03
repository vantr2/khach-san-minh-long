import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DangNhapPage from "./pages/DangNhapPage";
import DangKiPage from "./pages/DangKiPage";
import HomePage from "./pages/HomePage";
import ProfileCusPage from "./pages/ProfileCusPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dang-nhap" exact component={DangNhapPage}></Route>
        <Route path="/dang-ki" exact component={DangKiPage}></Route>
        <Route path="/profile" exact component={ProfileCusPage}></Route>
        <Route path="/" exact component={HomePage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
