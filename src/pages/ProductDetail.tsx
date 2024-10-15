import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { Header } from "../components/Header";
import { ProductTitle } from "../components/ProductTitle";
import { AddToCart } from "../components/AddToCart";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => !!id && p.id === parseInt(id));
  const { addItemDispatcher } = useCart();

  const addToCart = () => {
    if (!addItemDispatcher) return; // If the context provider is not available, do nothing
    if (!product) return; // If the product is not available, do nothing
    addItemDispatcher(product);
  };

  return (
    <>
      <Header showBackButton />
      <div className="f padding f-col">
        {!product ? (
          <p className="small center">Select a product to see its details</p>
        ) : (
          <div className="f f-col gap">
            <h2 className="f gap no-margin f-align-center">
              <ProductTitle product={product} />
            </h2>
            <h4 className="no-margin">Nutritional Information:</h4>
            <ul className="no-margin">
              <li>Calories: {product.nutritionalInfo.calories}</li>
              <li>Fat: {product.nutritionalInfo.fat}g</li>
              <li>Protein: {product.nutritionalInfo.protein}g</li>
            </ul>
            <h4 className="no-margin">Ingredients:</h4>
            <ul className="no-margin">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4 className="no-margin">Reviews:</h4>
            <ul className="no-margin">
              {product.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
            <AddToCart onClick={addToCart} />
          </div>
        )}
      </div>
    </>
  );
};
