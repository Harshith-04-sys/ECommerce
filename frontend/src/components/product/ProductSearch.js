import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import SkeletonGrid from "../layouts/SkeletonGrid";
import MetaData from ".././layouts/MetaData";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ProductSearch.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([100, 100000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();
  const [searchParams] = useSearchParams();

  // Calculate total pages from backend response
  const totalPages = productsCount && resPerPage ? Math.ceil(productsCount / resPerPage) : 0;
  
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Get category from URL query params if present
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    } else {
      setCategory(null);
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, dispatch, keyword, priceChanged, category, rating, currentPage]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [keyword, priceChanged, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <MetaData title={"Search Products"} />
          <h1 id="products_heading">Search Products</h1>
          <SkeletonGrid count={8} />
        </Fragment>
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container-fluid mt-5">
            <div className="row">
              <div className="col-12 col-md-3 col-lg-2 mb-5 mt-5">
                {/* Price Filter */}
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{
                      100: "₹100",
                      100000: "₹100,000",
                    }}
                    min={100}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`₹${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}> </div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-5" />
                {/* Ratings Filter */}
                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={star}
                        onClick={() => {
                          setRating(star);
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{
                              width: `${star * 20}%`,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-9 col-lg-10">
                {products && products.length > 0 ? (
                  <div className="product-grid">
                    {products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="no-products">
                    <p>No products found matching your criteria.</p>
                  </div>
                )}

                {/* Custom Pagination */}
                {productsCount > resPerPage && (
                  <div className="pagination-container">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
