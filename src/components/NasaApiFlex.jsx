import { useState, useEffect } from "react";

export default function NasaApiFlex() {
  const [mars, setMars] = useState(null);

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
      <div className="d-flex flex-wrap">
        {mars && mars.photos && mars.photos.length > 0 ? (
          mars.photos.map((photo) => (
            <div key={photo.img_src} className="card p-2 m-2 w-25">
              <img src={photo.img_src} className="card-img-top" height="150" />
              <div className="card-harder">
                <h2 key={photo.camera.full_name}>{photo.camera.full_name}</h2>
              </div>
              <div className="card-body">
                <p key={photo.rover.name}>{photo.rover.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading photos or no data available...</p>
        )}
      </div>
    </div>
  );
}
