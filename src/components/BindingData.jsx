export default function BindingData() {
  var categories = ["All", "Electronics", "Footwear"];
  return (
    <div className="container">
      <h2> list of Categories</h2>
      {/* <ol>{categories.join("+")}</ol> */}
      <ol>
        {categories.map(function (category) {
          return <li key={categories}>{category}</li>;
        })}
      </ol>
      <h2> dropdown </h2>
      <select>
        {categories.map((categories) => (
          <option key={categories} value={categories}>
            {categories}
          </option>
        ))}
      </select>
    </div>
  );
}
