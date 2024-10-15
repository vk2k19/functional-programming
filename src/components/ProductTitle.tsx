import { Product } from "../data/products";
import { isFresh } from "../utils/isFresh";

export const ProductTitle = ({ product }: { product: Product }) => (
  <>
    <span>
      {product.name} - ${product.price.toFixed(2)}
    </span>
    {isFresh(product.dateAdded) && <span className="fresh">Fresh!</span>}
  </>
);
