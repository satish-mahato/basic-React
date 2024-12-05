export default function ProductTableArray() {
  var menu = [
    { Categories: "Electronic", Product: ["Lg Tv", "Samsung Tv"] },
    { Categories: "Footwear", Product: ["Addidas", "Nike"] },
  ];
  return (
    <div className="container">
      <h2>Menu</h2>
      <ol>
        {menu.map((items) => (
          <li key={items.Categories}>
            {items.Categories}
            <ul>
              {items.Product.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <h2> Select a Product</h2>
      <select>
        {menu.map((items) => (
          <optgroup key={items.Categories} label={items.Categories}>
            {items.Product.map((product) => (
              <option key={product}>{product}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
