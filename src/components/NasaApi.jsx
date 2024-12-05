import { useState, useEffect } from "react";

export default function NasaApi() {
  const [mars, setMars] = useState(null); // Initialize as null to handle conditional rendering

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=E5ev3gqshH9WGukYdtslATK0P1ULvEgSho6n7iAg"
    )
      .then((response) => response.json())
      .then((data) => {
        setMars(data);
      });
  }, []);

  return (
    <div className="container">
      <h2> Mars Photos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Photo ID</th>
            <th>Camera Name</th>
            <th>Rover Name</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {mars && mars.photos && mars.photos.length > 0 ? (
            mars.photos.map((photo) => (
              <tr key={photo.id}>
                <td>{photo.id}</td>
                <td>{photo.camera.full_name}</td>
                <td>{photo.rover.name}</td>
                <td>
                  <img
                    src={photo.img_src}
                    alt="Mars"
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No photos available or loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
