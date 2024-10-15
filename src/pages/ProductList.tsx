import { Product } from "../data/products"; // Import the mock data
import { Header } from "../components/Header";
import { CustomLink } from "../components/CustomLink";
import { isFresh } from "../utils/isFresh";
import { ChangeEvent, useEffect, useState } from "react";
import * as R from "ramda";
import { Chevron } from "../components/Chevron";
import { Select } from "../components/Select";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ category: "", sort: "name_asc" });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadedProducts = async () => {
      const data = await import("../data/products");
      setProducts(data.products);
      setFilteredProducts(data.products);
    };
    loadedProducts();
  }, []);

  const applyFilterAndSort = R.pipe(
    R.filter((product: Product) =>
      filter.category ? product.categories.includes(filter.category) : true
    ),
    R.sortWith([
      filter.sort === "price_aesc"
        ? R.ascend(R.prop("price"))
        : R.descend(R.prop("price")),
      filter.sort === "name_aesc"
        ? R.ascend(R.prop("name"))
        : R.descend(R.prop("name")),
    ])
  );

  useEffect(() => {
    setFilteredProducts(applyFilterAndSort(products));
  }, [filter, products]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      category: e.target.value,
    });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("handleSortChange", e.target.value);
    setFilter({
      ...filter,
      sort: e.target.value,
    });
  };

  return (
    <>
      <Header nonClickableLogo />
      <div className="padding">
        <h2>Our Products</h2>
        <div className="padding f f-centre-align f-justify-center">
          <Select
            label="Filter by Category"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            options={[
              { id: "A", value: "", label: "All" },
              { id: "F", value: "fruits", label: "Fruits" },
              { id: "V", value: "vegetables", label: "Vegetables" },
            ]}
          />
          <Select
            label="Sort by"
            name="sortBy"
            value={filter.category}
            onChange={handleSortChange}
            options={[
              { id: "", value: "", label: "None" },
              { id: "p-d", value: "price_desc", label: "Price: High to Low" },
              { id: "p-a", value: "price_aesc", label: "Price: Low to High" },
              { id: "n-d", value: "name_desc", label: "Name: Z-A" },
              { id: "n-a", value: "name_aesc", label: "Name: A-Z" },
            ]}
          />
        </div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    handleSortChange({
                      target: {
                        value:
                          filter.sort === "name_aesc"
                            ? "name_desc"
                            : "name_aesc",
                      },
                    } as ChangeEvent<HTMLSelectElement>);
                  }}
                  className="dynamo f gap"
                >
                  Product Name{" "}
                  {filter.sort.includes("name") && (
                    <Chevron up={filter.sort === "name_aesc"} />
                  )}
                </button>
              </th>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    handleSortChange({
                      target: {
                        value:
                          filter.sort === "price_aesc"
                            ? "price_desc"
                            : "price_aesc",
                      },
                    } as ChangeEvent<HTMLSelectElement>);
                  }}
                  className="dynamo f gap"
                >
                  Price{" "}
                  {filter.sort.includes("price") && (
                    <Chevron up={filter.sort === "name_aesc"} />
                  )}
                </button>
              </th>
              <th className="padding-small border dynamo">Fresh</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
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
