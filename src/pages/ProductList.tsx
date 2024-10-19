import { Header } from "../components/Header";
import { CustomLink } from "../components/CustomLink";
import { isFresh } from "../utils/isFresh";
import { ChangeEvent, useEffect, useState } from "react";
import * as R from "ramda";
import { Select } from "../components/Select";
import { Subject } from "rxjs";
import { map, combineLatestWith } from "rxjs/operators";
import { Product } from "../data/products";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  // Create RxJS subjects
  const category$ = new Subject<string>();
  const search$ = new Subject<string>();
  const sort$ = new Subject<string>();

  useEffect(() => {
    const loadedProducts = async () => {
      const { products } = await import("../data/products");
      const filterAndSort$ = category$
        .pipe(
          combineLatestWith(sort$, search$),
          map(([category, sort, search]: string[]) => {
            console.log("filter and sort", category, sort, search);
            // Filter products by category
            const filteredByCategory = R.ifElse(
              R.always(category),
              R.filter(
                (product: Product) =>
                  !category || R.includes(category, product.categories)
              ),
              R.identity
            )(products) as Product[];

            // search by name
            const filteredByName = R.filter((product: Product) =>
              R.includes(R.toLower(search), R.toLower(product.name))
            )(filteredByCategory);

            // Sort products
            const sortedProducts = R.cond([
              [R.equals("name"), () => R.sortBy(R.prop("name"))],
              [R.equals("price"), () => R.sortBy(R.prop("price"))],
              [R.T, () => R.identity],
            ])(sort) as Function;

            // Return final filtered and sorted list
            return sortedProducts(filteredByName);
          })
        )
        .subscribe(setFilteredProducts);

      // Emit initial values
      category$.next(category);
      sort$.next(sort);
      search$.next(search);

      // Clean up the subscription
      return () => {
        filterAndSort$.unsubscribe();
      };
    };
    loadedProducts();
  }, [category, sort, search]);

  // Handlers to update category and sort
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <>
      <Header nonClickableLogo />
      <div className="padding">
        <h2>Our Products</h2>
        <div className="f gap padding-y">
          <Select
            label="Filter by Category"
            name="category"
            onChange={handleCategoryChange}
            options={[
              { id: "A", value: "", label: "All" },
              { id: "F", value: "fruits", label: "Fruits" },
              { id: "V", value: "vegetables", label: "Vegetables" },
            ]}
          />
          <Select
            label="Sort by"
            name="sortBy"
            onChange={handleSortChange}
            options={[
              { id: "", value: "", label: "None" },
              { id: "p-d", value: "price", label: "Price" },
              { id: "n-d", value: "name", label: "Name" },
            ]}
          />
        </div>
        <br />
        <label className="f gap">
          <span>Search by Name:</span>
          <input
            type="search"
            placeholder="Search by Name"
            onChange={(e) => {
              console.log("Search", e.target.value);
              setSearch(e.target.value);
            }}
          />
        </label>
        <br />
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    setSort("name");
                  }}
                  className="dynamo f gap"
                >
                  Product Name{" "}
                  {/* {sortFilter$.getValue().includes("name") && (
                    <Chevron up={sortFilter$.getValue() === "name_aesc"} />
                  )} */}
                </button>
              </th>
              <th className="padding-small border">
                <button
                  onClick={() => {
                    setSort("price");
                  }}
                  className="dynamo f gap"
                >
                  Price{" "}
                  {/* {sortFilter$.getValue().includes("price") && (
                    <Chevron up={sortFilter$.getValue() === "name_aesc"} />
                  )} */}
                </button>
              </th>
              <th className="padding-small border dynamo">Fresh</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
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
