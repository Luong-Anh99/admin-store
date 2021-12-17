import React from "react";

import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

import Home from "../pages/home/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserList from "./userList/UserList";

import User from "./user/User";
import NewUser from "./newUser/NewUser";
import ProductList from "./productList/ProductList";
import Product from "./product/Product";
import NewProduct from "./newProduct/NewProduct";
import OrderList from "./order-list/OrderList";

import Order from "./order/Order";
import CategoryList from "./category-list/CategoryList";
import NewCategory from "./new-category/NewCategory";
import Category from "./category/Category";
import SizeList from "./size-list/SizeList";
import NewSize from "./new-size/NewSize";
import Size from "./size/Size";

function MasterLayout() {
  return (
    <Router>
      <div>
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
              <NewSize />
            </Route>

            <Route path="/size/:sizeId">
              <Size />
            </Route>

            <Route path="/sizes">
              <SizeList />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default MasterLayout;
