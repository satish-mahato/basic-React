import { useEffect, useState } from "react";

export default function FakeStoreComponent() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  function LoadCategories() {
    fetch(`${import.meta.env.VITE_FAKESTORE}/categories`)
      .then((response) =>
        response.json().then((data) => {
          data.unshift("All");
          setCategories(data);
        })
      )
      .catch((error) => console.error("Error loading categories:", error));
  }

  function LoadProduct() {
    fetch(`${import.meta.env.VITE_FAKESTORE}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error loading products:", error));
  }

  useEffect(() => {
    LoadCategories();
    LoadProduct();
  }, []);

  return (
    <div className="container-fluid">
      <header className="bg-danger text-center p-2">
        <h1>
          <span className="bi bi-cart"></span> Shopping Home
        </h1>
      </header>
      <section className="row">
        <nav className="col-3">
          <div>
            <label>Select a Category</label>
            <div>
              <select className="form-select">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category}>{category.toUpperCase()}</option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
          </div>
        </nav>
        <main className="col-9 d-flex flex-wrap overflow-auto" height="500">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="card m-2 p-2 w-25">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="150"
                />
                <div className="card-header">
                  <p>{product.title}</p>
                </div>
                <div className="card-body">
                  <dl>
                    <dt>Price</dt>
                    <dd>${product.price}</dd>
                    <dt>Rating</dt>
                    <dd>
                      <span className="bi bi-star-fill text-warning"></span>{" "}
                      {product.rating.rate}{" "}
                      <span>({product.rating.count} reviews)</span>
                    </dd>
                  </dl>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </main>
      </section>
    </div>
  );
}
