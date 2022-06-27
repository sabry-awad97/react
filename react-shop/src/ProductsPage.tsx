import React from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./hooks";
import ProductsList from "./ProductsList";
import { getProducts, selectProducts } from "./ProductsReducer";

const ProductsPage: React.FC = () => {
  const { products, productsLoading } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="page-container">
      <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
      <ProductsList
        search={search}
        products={products}
        isLoading={productsLoading}
      />
    </div>
  );
};

export default ProductsPage;
