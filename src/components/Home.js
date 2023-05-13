import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  let compMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      console.log(res);
      if (compMounted) {
        setData(await res.clone().json());
        setFilter(await res.json());
        setLoading(false);
      }
      return () => {
        compMounted = false;
      };
    };
    getProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setFilter(
      data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  const Loading = () => {
    return <>Loading...</>;
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() =>
              setFilter(data.filter((x) => x.category === "men's clothing"))
            }
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() =>
              setFilter(data.filter((x) => x.category === "women's clothing"))
            }
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() =>
              setFilter(data.filter((x) => x.category === "jewelery"))
            }
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() =>
              setFilter(data.filter((x) => x.category === "electronics"))
            }
          >
            Electronic
          </button>
        </div>
        {filter.map((p) => {
          return (
            <>
              <div className="col-md-3">
                <div
                  className="card h-100 text-center p-4"
                  key={p.id}
                  style={{ width: "20rem" }}
                >
                  <img
                    src={p.image}
                    className="card-img-top"
                    alt={p.title}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">${p.price}</p>
                    <a href={`/products/${p.id}`} className="btn btn-primary">
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <h1>Our Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 mb-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products"
                aria-label="Search Products"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
