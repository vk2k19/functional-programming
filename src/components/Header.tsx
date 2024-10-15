import { useCart } from "../context/CartContext";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { CustomLink } from "./CustomLink";
import Navbar from "./Navbar";

export const Header = ({
  showBackButton = false,
  hideCartButton = false,
  nonClickableLogo = false,
}: {
  showBackButton?: boolean;
  hideCartButton?: boolean;
  nonClickableLogo?: boolean;
}) => {
  const { items } = useCart();
  return (
    <>
      <div className="f f-justify-between gap">
        <div className="f gap f-align-center">
          {showBackButton && (
            <CustomLink
              to="/products"
              noExpandingBorder
              aria-label="Back to product list"
            >
              <Icon children="&#8592;" />
            </CustomLink>
          )}
          <h1 className="header no-margin f-align-center f-justify-center f gap">
            {!nonClickableLogo ? (
              <CustomLink to="/products" className="nudge f" noExpandingBorder>
                <Logo />
              </CustomLink>
            ) : (
              <Logo />
            )}
            <div>
              FP.ECOM
              <p className="small center no-margin">
                Your neghbourhood grocer.
              </p>
            </div>
          </h1>
        </div>
        <Navbar />
        {!hideCartButton && items.length > 0 && (
          <div className="f f-align-center">
            <CustomLink
              to="/cart"
              aria-label="View Cart Details"
              style={{ position: "relative" }}
              className="nudge"
              noExpandingBorder
            >
              <Icon>Cart</Icon>
              <span
                className="badge dynamo border bg"
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  padding: "0 5px",
                }}
              >
                {items.length}
              </span>
            </CustomLink>
          </div>
        )}
      </div>
      <hr />
    </>
  );
};
