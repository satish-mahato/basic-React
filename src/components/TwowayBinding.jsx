import { useState } from "react";

export default function TwoWayBinding() {
  const [product, setProduct] = useState({
    Name: "",
    Price: 0,
    City: "",
    Stock: false,
  });
  const [newProduct, setNewProduct] = useState({
    Name: "",
    Price: 0,
    City: "",
    Stock: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleRegisterClick() {
    setNewProduct(product);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h2>Register Product</h2>
          <dl>
            <dt>Name</dt>
            <dd>
              <input
                className="form-control"
                name="Name"
                onChange={handleChange}
                type="text"
                value={product.Name}
              />
            </dd>
            <dt>Price</dt>
            <dd>
              <input
                className="form-control"
                name="Price"
                onChange={handleChange}
                type="text"
                value={product.Price}
              />
            </dd>
            <dt>City</dt>
            <dd>
              <select
                name="City"
                onChange={handleChange}
                className="form-select"
                value={product.City}
              >
                <option value="">Select City</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyd">Hyd</option>
              </select>
            </dd>
            <dt>Stock</dt>
            <dd className="form-switch">
              <input
                name="Stock"
                onChange={handleChange}
                className="form-check-input"
                type="checkbox"
                checked={product.Stock}
              />{" "}
              Available
            </dd>
          </dl>
          <button
            onClick={handleRegisterClick}
            className="btn btn-primary w-100"
          >
            Register
          </button>
        </div>
        <div className="col-9">
          <h2>Product Details</h2>
          <dl>
            <dt>Name</dt>
            <dd>{newProduct.Name}</dd>
            <dt>Price</dt>
            <dd>{newProduct.Price}</dd>
            <dt>City</dt>
            <dd>{newProduct.City}</dd>
            <dt>Stock</dt>
            <dd>{newProduct.Stock ? "Available" : "Out of Stock"}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
