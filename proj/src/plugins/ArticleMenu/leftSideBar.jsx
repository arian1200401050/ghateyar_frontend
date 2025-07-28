import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import config from "#src/config.js";

const LeftSideBar = () => {
  const { menuId: article_menu_id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article_menu_id) return;
    setLoading(true);
    setError(null);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.BACKEND_URL}/api/v1/product/product/related-to-article-menu/${article_menu_id}/`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [article_menu_id]);

  return (
    <aside className="w-64 bg-white border border-gray-300 rounded-sm shadow p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-center">محصولات پیشنهادی</h2>
      {loading && <div className="text-center text-gray-500">در حال بارگذاری...</div>}
      {error && <div className="text-center text-red-500">خطا در دریافت محصولات</div>}
      <div className="flex flex-col gap-4">
        {!loading && !error && products.map((product) => (
          <Link
            to={`/product/${product.product_uuid}`}
            key={product.product_uuid}
            className="group block rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md"
          >
            <div className="bg-gray-50 flex justify-center items-center h-32">
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : ""}
                alt={product.title}
                className="object-contain h-24 w-24 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="bg-white p-3 text-center">
              <span className="block text-base font-medium text-gray-800 truncate">
                {product.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default LeftSideBar;
