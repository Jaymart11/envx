import { useState, useRef, useEffect } from "react";
import "./hero.css";
import { hero } from "../../Data";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [width, setWidth] = useState("50%");
  const [colorId, setColorId] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(autoplayTimer);
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setWidth("60%");
      } else {
        setWidth("50%");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === hero.length - 1 ? 0 : prevIndex + 1
    );

    setColorId(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? hero.length - 1 : prevIndex - 1
    );

    setColorId(0);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    }
  };

  return (
    <div className="hero">
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
        <div
          className={`carousel-images ${isDragging ? "dragging" : ""}`}
          ref={carouselRef}
        >
          {hero.map((image, index) => (
            <>
              <div
                style={{
                  backgroundImage: `url(${image.heroBG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  justifyContent: "end",
                  height: "100%",
                }}
                className={index === currentIndex ? "active" : ""}
              >
                <div
                  className="image-color"
                  style={{
                    backgroundColor: `${image.color?.[colorId]?.name}`,
                    height: "100%",
                    width: `${width}`,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "100% 0 0 100%",
                    justifyContent: "start",
                  }}
                >
                  <img
                    style={{
                      width: `${width === "60%" ? "300px" : "500px"}`,
                      height: `${width === "60%" ? "30%" : "50%"}`,
                    }}
                    src={image.color?.[colorId]?.image}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="buttons">
        <div className="button-group">
          <div className="dropdown">
            <button className="color-btn" style={{ fontWeight: "bold" }}>
              COLOR
            </button>
            <ul className="dropdown-menu">
              {hero[currentIndex].color.map((color, index) => (
                <li key={color.name} onClick={() => setColorId(index)}>
                  <a>{color.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <button style={{ fontWeight: "bold" }}>
            PRICE
            <span
              style={{
                color: "rgb(255,79,55)",
                marginLeft: "20px",
                fontWeight: "bolder",
              }}
            >
              ${hero[currentIndex].price}
            </span>
          </button>
          <button
            style={{
              backgroundColor: "rgb(255,79,55)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            VIEW PRODUCT
          </button>
        </div>

        <div>
          <button
            style={{
              backgroundColor: "rgb(255,79,55)",
              color: "white",
              width: "150px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
}
