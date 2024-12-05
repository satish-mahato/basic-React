export default function ProductArray() {
  var products = [
    { Name: "Samsung Tv", Price: "5600" },
    { Name: "Nike Shoe", Price: "4200" },
  ];
  return (
    <div className="container">
      <h2>Product</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((products) => (
            <tr key={products}>
              <td>{products.Name}</td>
              <td>{products.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
