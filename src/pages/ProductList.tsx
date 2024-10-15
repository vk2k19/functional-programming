import { Product } from "../data/products"; // Import the mock data
import { Header } from "../components/Header";
import { CustomLink } from "../components/CustomLink";
import { isFresh } from "../utils/isFresh";
import { ChangeEvent, useEffect, useState } from "react";
import {
  filterByCategory,
  sortByName,
  sortByPrice,
} from "../utils/priceFilter";
import { Chevron } from "../components/Chevron";
import { Input } from "../components/Input";

const ProductList = () => {
  const [isPriceInAsec, setIsPriceInAsec] = useState(true);
  const [isNameInAsec, setIsNameInAsec] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    Product[]
  >([]);

  const sortBy = (field: "price" | "name") => {
    if (field === "price") {
      const elements = sortByPrice(filteredAndSortedProducts, !isPriceInAsec);
      setFilteredAndSortedProducts(elements);
      setIsPriceInAsec(!isPriceInAsec);
    } else if (field === "name") {
      setFilteredAndSortedProducts(
        sortByName(filteredAndSortedProducts, !isNameInAsec)
      );
      setIsNameInAsec(!isNameInAsec);
    }
  };

  useEffect(() => {
    const loadedProducts = async () => {
      const data = await import("../data/products");
      setProducts(data.products);
    };
    loadedProducts();
  }, []);

  useEffect(() => {
    if (!products.length) return;
    if (searchTerm.length > 0) {
      setFilteredAndSortedProducts(filterByCategory(products, searchTerm));
    } else {
      setFilteredAndSortedProducts(
        sortByName(sortByPrice(products, isPriceInAsec), isNameInAsec)
      );
    }
  }, [searchTerm, products]);

  return (
    <>
      <Header nonClickableLogo />
      <div className="padding">
        <h2>Our Products</h2>
        <div className="padding f f-centre-align f-justify-center">
          <Input
            label="Search"
            name="searchTerm"
            type="search"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search by product category..."
          />
        </div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    sortBy("name");
                  }}
                  className="dynamo f gap"
                >
                  Product Name <Chevron up={isNameInAsec} />
                </button>
              </th>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    sortBy("price");
                  }}
                  className="dynamo f gap"
                >
                  Price <Chevron up={isPriceInAsec} />
                </button>
              </th>
              <th className="padding-small border dynamo">Fresh</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map((product) => (
              <tr key={product.id}>
                <td className="border padding">
                  <CustomLink to={`/products/${product.id}`}>
                    {product.name}
                  </CustomLink>
                </td>
                <td className="border padding">${product.price}</td>
                <td className="border padding">
                  {isFresh(product.dateAdded) ? "Fresh!" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
