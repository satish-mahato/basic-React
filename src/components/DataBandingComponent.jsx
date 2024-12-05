export default function DataBandingComponent() {
  var product = {
    Name: "Lg Tv",
    Price: 4500,
    Stock: false,
  };
  return (
    <div className="container-fluid">
      <h2> Product Detail</h2>
      <dl>
        <dt>Name</dt>
        <dd>{product.Name}</dd>
        <dt>Price</dt>
        <dd>{product.Price}</dd>
        <dt>Stock</dt>
        <dd>{product.Stock == true ? "Available" : "out of Stock"}</dd>
      </dl>
    </div>
  );
}
