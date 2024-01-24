import { useEffect, useState } from "react";
import axios from "axios";

const useProductAPI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return products;
};

export default useProductAPI;
