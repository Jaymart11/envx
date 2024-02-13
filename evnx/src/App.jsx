import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import NavBar from "./components/NavBar/NavBar";
import Feature from "./components/Blog/Feature/FeatureProducts";
import Blog from "./components/Blog/Blog/Blog";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavBar isMobile={isMobile} />
      <section>
        <Hero />
      </section>
      <section>
        <Feature isMobile={isMobile} />
        <Blog />
      </section>
    </>
  );
}

export default App;
