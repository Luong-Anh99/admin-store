import React from "react";


import { BrowserRouter , Switch, Route } from "react-router-dom";
import "./app.css";
import Login from "./pages/login/Login";
import MasterLayout from "./pages/MasterLayout";
import { ProtectedRoute } from "./components/protected/protected.route";

function App() {
  return (
    <div>
      {/* <Login/> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute  path="/" component={MasterLayout} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
