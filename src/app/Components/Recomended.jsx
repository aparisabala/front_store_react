import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Remote } from "../Lib/Remote";
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function Recomended({query,title=''}) {
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
    return (
        <React.Fragment>
            <div className={`container ${(title != '') ? '':'p-0'}`}>
                <div className="gradient-box mt-0 ">
                    <h5 className="m-0 p-2 text-white">受到推崇的 Recomended</h5>
                </div>
            </div>
            <div className="container-fluid mb-3">

                <div className="d-flex flex-wrap recon-row" >
                    {
                        list?.map((item, index) => {
                            return (
                                <div className="recon-item" key={index}  onClick={()=>{goToProduct(item)}} style={{ cursor: 'pointer' }}>
                                    <div className="d-flex justify-content-center">
                                        <img alt={item?.new_name} className="img-fluid" src={cdn_url + '/' + item?.img} />
                                    </div>
                                    <div className="fs-11 fw-bold mt-1 text-center fixProductNameHeight"> {item?.new_name} </div>
                                    <div className="mt-1">
                                        <span className="d-flex justify-content-center align-items-center install-btn fs-12 cursor-pointer">
                                            <i className="fa fa-arrow-down"></i>
                                            <span>下载</span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
