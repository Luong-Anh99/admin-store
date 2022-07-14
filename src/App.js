import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import MasterLayout from "./pages/MasterLayout";
import { ProtectedRoute } from "./components/protected/protected.route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      {/* <ToastContainer autoClose={4000} /> */}
      {/* <Login/> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/" component={MasterLayout} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
