import 'swiper/css';
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Remote } from '../Lib/Remote';
import { chunkArray } from '../Lib/Helper';
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function LiveVideos({ query, title='' }) {
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
  });
  if (loading) {
    return (
      <div className="wrap">
          <Skeleton count={5} />
      </div>
    )
  }

  const { cdn_url = "", list = [] } = dbData;
  const chunk = chunkArray(list, 2);
  return (
    <React.Fragment>

      <div className={`container ${(title != '') ? '':'p-0'}`}>
        <div className="gradient-box">
          <h5 className="m-0 p-2 text-white">  色情直播 Live streaming </h5>
        </div>
      </div>

      <div className="container mt-2">
        {
          chunk.map((rows, cKey) => {
            return (
              <div className="row" key={cKey}>
                {
                  rows?.map((item, key) => {
                    return (
                      <div className="flex-fill dating-item" key={cKey + '_' + key} onClick={()=>{goToProduct(item)}}>
                        <div className="position-relative">
                          <img alt={item?.new_name} className="img-fluid" src={cdn_url + '/' + item?.img} />
                          <button className="btn btn-light position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-transparent border-0" style={{ width: "48px", height: "48px" }}>
                            <i className="fa-regular fa-circle-play text-white fs-32"></i>
                          </button>
                          <div className="position-absolute bottom-0 mb-4">
                            <h5 className="fs-15 fw-bold mt-1 ps-2 pe-2">
                              <span className="text-white bg-gradient-pink me-2 small rounded">热门 </span>
                              <span className="text-white"> {item?.new_name}  </span>
                            </h5>
                            <p className="m-0"></p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}
