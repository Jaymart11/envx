import { useRef } from "react";
import { hero } from "../../../Data";
import "./FeatureProducts.css";

// eslint-disable-next-line react/prop-types
export default function FeatureProducts({ isMobile }) {
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = isMobile ? 700 : 900; // Adjust as needed
    if (carouselRef.current) {
      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <>
      <div className="new-products">
        <button className="prev1" onClick={() => handleScroll("left")}>
          &#10094;
        </button>
        <h3>New Products</h3>
        <button className="next1" onClick={() => handleScroll("right")}>
          &#10095;
        </button>
      </div>
      <div className="carousel-products" ref={carouselRef}>
        {hero.map((image) => (
          <div className="item" key={image.title}>
            <h3>{image.title}</h3>
            <div className="img-details">
              <div className="details">
                <p>${image.price}</p>
                <button>Buy Now</button>
              </div>
              <img src={image.color[0].image} alt={image.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
