import { Link } from "react-router-dom";

export default function Product({ product, col }) {
  const target = `/product/${product._id}`;

  return (
    <div className={col ? `col-sm-12 col-md-6 col-lg-${col} my-3` : "product-grid-item"}>
      <Link to={target} className="card p-3 rounded product-card-link">
        {product.images.length > 0 && (
          <img
            className="card-img-top mx-auto"
            src={product.images[0].image || product.images[0].url}
            alt={product.name}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">₹{product.price}</p>
          <div id="view_btn" className="btn btn-block">View Details</div>
        </div>
      </Link>
    </div>
  );
}
