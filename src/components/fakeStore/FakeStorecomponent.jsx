import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const apiBaseUrl = import.meta.env.VITE_FAKESTORE;

export default function ShoppingComponent() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  // Fetch categories
  function LoadCategories() {
    fetch(`${apiBaseUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        data.unshift("all"); // Add "all" category
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  // Fetch products
  function LoadProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Initial load
  useEffect(() => {
    LoadCategories();
    LoadProducts(apiBaseUrl);
  }, []);

  // Handle category selection
  function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
      LoadProducts(apiBaseUrl);
    } else {
      LoadProducts(`${apiBaseUrl}/category/${selectedCategory}`);
    }
  }

  function handleAddToCart(e) {
    const productId = e.target.id;
    const selectedProduct = products.find((product) => product.id == productId);

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.id === selectedProduct.id
      );

      if (existingItem) {
        // If the item exists, increase its quantity by 1
        return prevCartItems.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item doesn't exist, add it with quantity 1
        return [...prevCartItems, { ...selectedProduct, quantity: 1 }];
      }
    });

    // Update total item count
    setItemsCount((prevCount) => prevCount + 1);

    // Show success alert
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart",
      text: `${selectedProduct.title} has been added to your cart!`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  function handleRemoveFromCart(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this item from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prevCartItems) => {
          const updatedCart = prevCartItems.reduce((acc, item) => {
            if (item.id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
              // If quantity is 1, do not push the item (it gets removed).
            } else {
              acc.push(item);
            }
            return acc;
          }, []);

          // Update the total item count
          const newItemsCount = updatedCart.reduce(
            (count, item) => count + item.quantity,
            0
          );
          setItemsCount(newItemsCount);

          return updatedCart;
        });

        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  }

  return (
    <div className="container-fluid">
      <header className="bg-danger text-white text-center p-2">
        <h1>
          <span className="bi bi-cart"></span> Shopping Home
        </h1>
      </header>
      <section className="row mt-3">
        {/* Sidebar for Categories */}
        <nav className="col-2">
          <div>
            <label>Select a Category</label>
            <div>
              <select onChange={handleCategoryChange} className="form-select">
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>

        {/* Main Product Display */}
        <main
          className="col-8 d-flex flex-wrap overflow-auto"
          style={{ height: "600px" }}
        >
          {products.map((product) => (
            <div key={product.id} className="card m-2 p-2 w-25">
              <img
                src={product.image}
                className="card-img-top"
                height="150"
                alt={product.title}
              />
              <div className="card-header" style={{ height: "160px" }}>
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>${product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-star-fill text-success"></span>
                    {product.rating.rate} <span>[{product.rating.count}]</span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  id={product.id}
                  onClick={handleAddToCart}
                  className="btn btn-danger w-100"
                >
                  <span className="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Cart Section */}
        <aside className="col-2">
          <button className="btn btn-danger w-100 mb-3">
            <span className="bi bi-cart3"></span> [{itemsCount}] Your Cart Items
          </button>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    {" "}
                    <img src={item.image} width="50" height="50" />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td> {/* Display quantity */}
                  <td>${(item.price * item.quantity).toFixed(2)}</td>{" "}
                  {/* Total price */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </section>
    </div>
  );
}
