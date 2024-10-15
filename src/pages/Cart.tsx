import { useCart } from "../context/CartContext";
import { Product } from "../data/products";
import { Header } from "../components/Header";
import { ProductTitle } from "../components/ProductTitle";
import { Icon } from "../components/Icon";
import { CustomLink } from "../components/CustomLink";
import { useEmptyCartRedirection } from "../hooks/useEmptyCartRedirection";

export const Cart = () => {
  const { items, removeItemDispatcher } = useCart();

  const removeItem = (id: number) => {
    if (!removeItemDispatcher) return; // If the context provider is not available, do nothing
    removeItemDispatcher({ id }); // Remove the item from the cart using the provided dispatcher function
  };

  const totalPrice = items
    .reduce((acc, curr) => acc + curr.price, 0)
    .toFixed(2);

  useEmptyCartRedirection();

  return (
    <>
      <Header hideCartButton />
      {items.length === 0 ? (
        <div className="f f-col f-align-center gap padding">
          <p className="small center no-margin">
            Your cart is empty. Add some products to see them in the cart.
          </p>
          <p className="small center no-margin">
            You will be redirected to the product lists shortly... or use below
            link for same.
          </p>
          <CustomLink to="/products" noExpandingBorder>
            <Icon children="See our product list" />
          </CustomLink>
        </div>
      ) : (
        <div className="f f-col gap padding">
          {items.map((item: Product) => (
            <div key={item.id} className="gap f f-col">
              <h2 className="no-margin f gap">
                <ProductTitle product={item} />
              </h2>
              <div className="f gap">
                <span className="small bold">Quantity: 1</span>
                <span className="small bold">Total Price: ${item.price}</span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="mw-content no-padding"
              >
                <Icon children="Remove" small />
              </button>
              <div>
                <hr style={{ opacity: 0.5, borderTopStyle: "dashed" }} />
              </div>
            </div>
          ))}
          {items.length > 0 && (
            <div className="f gap no-margin f-justify-between">
              <h2 className="f gap no-margin f-align-center">
                Total Price: ${totalPrice}
              </h2>
              <CustomLink to="/checkout" className="mx-w-240" noExpandingBorder>
                <Icon children="Checkout" />
              </CustomLink>
            </div>
          )}
        </div>
      )}
    </>
  );
};
