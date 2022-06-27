import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./hooks";
import Product from "./Product";
import { getProduct, selectProducts } from "./ProductsReducer";
import { selectBasket, addToBasket } from "./BasketReducer";

const ProductPage: React.FC = () => {
  const { currentProduct, productsLoading } = useAppSelector(selectProducts);
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  const added = basket.products.some(p =>
    currentProduct ? p.id === currentProduct.id : false
  );

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const id: number = parseInt(params.id, 10);
      dispatch(getProduct(id));
    }
  }, [dispatch]);

  const handleAddClick = () => {
    currentProduct && dispatch(addToBasket(currentProduct));
  };

  return (
    <div className="page-container">
      {currentProduct || productsLoading ? (
        <Product
          product={currentProduct!}
          inBasket={added}
          onAddToBasket={handleAddClick}
          isLoading={productsLoading}
        />
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  );
};

export default ProductPage;
