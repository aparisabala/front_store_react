import 'swiper/css';
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Remote } from '../Lib/Remote';
import { chunkArray } from '../Lib/Helper';
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function DatingZone({query,title=''}) {
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
          <h5 className="m-0 p-2 text-white">约会区 Dating Zone</h5>
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
                      <div className="flex-fill dating-item cursor-pointer" key={cKey + '_' + key} onClick={()=>{goToProduct(item)}}>
                        <div className="position-relative">
                          <div className="position-absolute dating-btn">
                            {item?.dn_nm} 人约过
                          </div>
                          <img alt={item?.new_name} className="img-fluid"
                            src={cdn_url + '/' + item?.img} />
                          <div>
                            <h5 className="fs-15 fw-bold mt-1">
                              {item?.new_name} 
                            </h5>
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
