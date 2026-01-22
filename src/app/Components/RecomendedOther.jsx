import React, { useEffect, useState } from "react";
import { Remote } from '../Lib/Remote';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function RecomendedOther({query}) {
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
  }, []);
  if (loading) {
    return (
      <div className="wrap">
          <Skeleton count={5} />
      </div>
    )
  }
  const { cdn_url = "", list = [] } = dbData;
  return (
    <div className="container">
      {
        list?.map((item, index) => {
          return (
            <div className="row" key={index} onClick={()=>{goToProduct(item)}}>
              <div className="col-md-12">
                <div className="position-relative">
                  <div className="mb-2 d-flex w-100 justify-content-start">
                    <div className="other-image-base me-1">
                      <img alt={item?.new_name} className="img-fluid" src={cdn_url + '/' + item?.img} />
                    </div>
                    <div className="text-part d-block me-auto">
                      <h5 className="fs-14 fw-bold m-0 mb-1">{item?.new_name}</h5>
                      <p className="fs-12 m-0">{item?.slogan}</p>
                    </div>
                    <div className="d-block align-self-center">
                      <span className="d-flex flex-row justify-content-center align-items-center install-btn fs-12 cursor-pointer">
                        <i className="fa fa-arrow-down"></i>
                        <span>下载 </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )
        })
      }
    </div>
  )
}
