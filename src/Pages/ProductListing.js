import { useData } from "../Contexts";
import { ProductCard, Loader } from "../Components";

export function ProductListing() {
  console.log("Product Listing called")

  const { showInventoryAll, showFastDeliveryOnly, sortBy , dispatch, data, loading } = useData();
  console.log("Loading: ", loading)

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(data, sortBy);
  const filteredData = getFilteredData(sortedData, {
  showFastDeliveryOnly,
  showInventoryAll
  });
  
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
        <fieldset>
          <legend>Sort By</legend>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            ></input>{" "}
            Price - High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            ></input>{" "}
            Price - Low to High
          </label>
        </fieldset>

        <fieldset style={{ marginTop: "1rem" }}>
          <legend> Filters </legend>
          <label>
            <input
              type="checkbox"
              checked={showInventoryAll}
              onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
            />
            Include Out of Stock
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFastDeliveryOnly}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            Fast Delivery Only
          </label>
        </fieldset>

        <div className="App" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", rowGap: "2rem" }}>
          {filteredData.map(
            (item) => (<ProductCard product={item}/>)
          )}
        </div>
      </>
      )}
  </>
  );
}
