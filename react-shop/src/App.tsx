import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./Header";
const AdminPage = React.lazy(() => import("./AdminPage"));
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ContactUsPage from "./ContactUsPage";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Provider } from "react-redux";

interface IProps {
  store: Store<RootState>;
}

const App: React.FC<IProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <Provider store={props.store}>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route index element={<Navigate to="products" />} />
            <Route path="contactus" element={<ContactUsPage />}></Route>
            <Route path="products" element={<ProductsPage />}></Route>
            <Route path="products/:id" element={<ProductPage />} />
            <Route
              path="admin/*"
              element={
                loggedIn ? (
                  <Suspense
                    fallback={<div className="page-container">Loading...</div>}
                  >
                    <AdminPage />
                  </Suspense>
                ) : (
                  <Navigate to="login" replace />
                )
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
