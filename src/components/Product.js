import React, { useEffect, useState } from "react";
import {useParams} from 'react-router';

export default function Product() {
  const {id} = useParams();
  const [product, setProduct] = useState([]);


  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await res.json());
    };
    getProduct();
  }, []);

  const ShowProduct = ()=> {
    return(
        <>
        <div className="col-md-6">
            <img src={product.image} height="400px" width="400px"/>
        </div>
        <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">
                {product.category}
            </h4>
            <h1 className="display-5">{product.title}</h1>
            <h3 className="display-6 fw-bold my-4">
                ${product.price}
            </h3>
            <p className="lead">{product.description}</p>
            <button className="btn btn-outline-dark">Add to cart</button>
        </div>
        </>
    )
  }
  return (
  <div>
    <div className="container">
        <div className="row">
            <ShowProduct/>
        </div>
    </div>
  </div>
  );
}
