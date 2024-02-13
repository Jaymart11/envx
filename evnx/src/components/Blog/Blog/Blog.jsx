import { blogData } from "../../../Data";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="blog-container">
      <div className="blog">
        <div className="blog-header">
          <h3>Blog x Events</h3>
          <button>SEE ALL</button>
        </div>
        {blogData.map((blog) => (
          <div className="blog-item" key={blog.content}>
            <img src={blog.picture} />
            <div className="blog-content">
              <p>{blog.date}</p>
              <p>{blog.content.substring(0, 150)}</p>
              <button>SEE MORE</button>
            </div>
          </div>
        ))}
      </div>
      <div className="shop-now">
        <img src="3.jpg" />
        <div className="overlay">
          <img src="fullfaceblack.png" />
          <div className="text">
            <h3>AGV BEST SELLER</h3>
            <p>SEE OUR MOST POPULAR PRODUCTS</p>
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
