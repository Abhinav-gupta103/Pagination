import "./style.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip${page * 10 - 10}`
      );

      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(parseInt(data.total / 10));
      }
    }
    fetchData();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage < 1 || selectedPage > totalPages || selectedPage === page)
      return;
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.id} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={
                  page === i + 1
                    ? "pagination__selected"
                    : "pagination__unselcted"
                }
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
