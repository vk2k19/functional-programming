import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { useEmptyCartRedirection } from "../hooks/useEmptyCartRedirection";

export const Checkout = () => {
  const { items, clearItemDispatcher } = useCart();
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();
  // Calculate total price of items in the cart here and store it in the `totalPrice` variable.
  const totlaPrice = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const onSubmit = (e: any) => {
    e.preventDefault();
    e.target.reset();
    setOrderConfirmed(true);
    setTimeout(() => {
      if (clearItemDispatcher) clearItemDispatcher();
      navigate("/products");
    }, 3000); // Simulate a 3-second delay before redirecting to the homepage.
  };

  const orderId = Date.now();

  useEmptyCartRedirection();

  return (
    <>
      <Header hideCartButton nonClickableLogo />
      {!items.length ? (
        <>
          <h2>Something went wrong!</h2>
          <p className="regular no-margin">
            Your cart is empty. Please add item to checkout.
          </p>
          <p className="no-margin">
            You will be redirected to the product lists shortly...
          </p>
        </>
      ) : isOrderConfirmed ? (
        <>
          <h2>Thank you for your purchase!</h2>
          <p className="regular">
            Your order number is: <strong>{orderId}</strong>
          </p>
          <p>You will be redirected to the homepage shortly...</p>
        </>
      ) : (
        <>
          <div className="f f-col padding">
            <div className="f f-justify-between f-align-center">
              <h2 className="no-margin">Checkout</h2>
              <p className="regular bold">Cart Total: ${totlaPrice}</p>
            </div>
            <h3 className="no-margin">Provide your details to checkout</h3>
            <p className="no-margin">
              * are the required information to place an order
            </p>
            <form className="f f-col gap padding" onSubmit={onSubmit}>
              <Input
                label="Name"
                required
                name="name"
                type="text"
                pattern="[A-Za-z ]{3,25}"
                placeholder="Jhon Doe"
              />
              <Input
                label="Email"
                required
                name="email"
                type="text"
                placeholder="jhon.doe@example.com"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              />
              <Input
                label="Address"
                required
                name="address"
                type="text"
                pattern="[A-Za-z ]{3,25}"
              />
              <Input
                label="Address 2"
                name="address2"
                type="text"
                pattern="[A-Za-z ]{3,25}"
              />
              <Input
                label="Street"
                name="street"
                type="text"
                pattern="[A-Za-z ]{3,25}"
              />
              <Input
                label="City"
                name="city"
                type="text"
                pattern="[A-Za-z ]{3,25}"
              />
              <Input
                label="State"
                required
                name="state"
                type="text"
                placeholder="KA"
                pattern="[A-Z]{2}"
              />
              <Input
                label="ZipCode"
                required
                name="zip"
                type="text"
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength={5}
                minLength={5}
              />
              <Input
                label="Country"
                required
                name="country"
                type="text"
                pattern="[A-Za-z]{1,25}"
              />
              <Input
                label="Phone"
                required
                name="phone"
                type="text"
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
              />
              <div>
                <hr />
              </div>
              <button type="submit" className="mx-w-240 no-padding">
                <Icon children="Purchase" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};
