import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Remote } from "../Lib/Remote";
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function Recomended({ query, title = "" }) {
  const goToProduct = useNavigateToProduct();
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAndSend() {
      try {
        const { data, status } = await Remote.get(query);
        if (status === 200) {
          setDbData(data?.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch/send error:", err);
      }
    }
    fetchAndSend();
  },[]);
  if (loading) {
    return (
      <div className="wrap">
        <Skeleton count={5} />
      </div>
    );
  }
  const { cdn_url = "", list = [] } = dbData;
  return (
    <React.Fragment>
      <div className={`container ${title != "" ? "" : "p-0"}`}>
        <div className="gradient-box mt-0 ">
          <h5 className="m-0 p-2 text-white">官方推荐 Recomended</h5>
        </div>
      </div>
      <div className="container-fluid mb-3">
        <div className="recon-row">
          {list?.map((item, index) => (
            <div
              className="recon-item"
              key={index}
              onClick={() => goToProduct(item)}
            >
              <div className="icon-wrap">
                <img src={cdn_url + "/" + item?.img} alt={item?.new_name} />
              </div>

              <div className="app-name">{item?.new_name}</div>

              <span className="download-btn">
                <i className="fa fa-arrow-down"></i>
                下载
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
