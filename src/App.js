import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/user/userAction";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

import Order from "./pages/order/Order"
import CategoryList from "./pages/category-list/CategoryList";
import NewCategory from "./pages/new-category/NewCategory";
import Category from "./pages/category/Category";
import SizeList from "./pages/size-list/SizeList";
import NewSize from "./pages/new-size/NewSize";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchTotoList = async() => {
  //     try{
  //       const response = await todoApi.getAll();
  //       if(response) dispatch(setUser(response))
  //     } catch(error) {
  //       console.log("error:", error);
  //     }
  //   }

  //   fetchTotoList();
  // }, [])

  return (
    <Router>
      <Route path="/login">
        <Login />
      </Route>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newProduct">
            <NewProduct />
          </Route>


          <Route path="/order/:orderId">
            <Order />
          </Route>
          <Route path="/orders">
            <OrderList />
          </Route>

           <Route path="/newCategory">
            <NewCategory />
          </Route>

          <Route path="/category/:categoryId">
            <Category />
          </Route> 

          <Route path="/categories">
            <CategoryList />
          </Route>

           <Route path="/newSize">
            <NewSize/>
          </Route>
{/*
          <Route path="/size/:sizeId">
            <Size />
          </Route>  */}

          <Route path="/sizes">
            <SizeList />
          </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
