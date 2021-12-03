import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/user/userAction";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";

import { BrowserRouter , Switch, Route } from "react-router-dom";

import "./app.css";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import todoApi from "./api/todoApi";
import Login from "./pages/login/Login";
import OrderList from "./pages/order-list/OrderList";

import Order from "./pages/order/Order";
import CategoryList from "./pages/category-list/CategoryList";
import NewCategory from "./pages/new-category/NewCategory";
import Category from "./pages/category/Category";
import SizeList from "./pages/size-list/SizeList";
import NewSize from "./pages/new-size/NewSize";
import Size from "./pages/size/Size";
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
