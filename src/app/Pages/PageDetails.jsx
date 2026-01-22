import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Remote } from '../Lib/Remote';
import Skeleton from 'react-loading-skeleton';
import ComDetailsSlider from '../Components/ComDetailsSlider';
import { useNavigate } from "react-router-dom";
import ComReletedProduct from '../Components/ComReletedProduct';
export default function PageDetails() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };
    const [loading, setLoading] = useState(true);
    const [dbData, setDbResponse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchAndSend() {
            try {
                const { data, status } = await Remote.get(`getdata/getDetails?id=${id}&channel=h001`);
                if (status === 200) {
                    setDbResponse(data?.data ?? {});
                    setLoading(false);
                }
            } catch (err) {
                console.error("Fetch/send error:", err);
            }
        }
        fetchAndSend();
    }, [id]);
    if (loading) {
        return (
            <div className="wrap">
                <Skeleton count={5} />
            </div>
        )
    }
    const { cdn_url = "", list = [], related=[] } = dbData;
    return (
        <React.Fragment>
            <div className="wrap">
                <div className="container-fluid detail-bar">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h5 className="m-0 p-2 text-white backToPage"> <i className="fa-solid fa-angle-left fs-30 cursor-pointer" onClick={handleGoBack}></i> </h5>
                        <h5 className="m-0 p-2 text-white">  应用详情 </h5>
                        <div className="m-0 p-2 text-white d-flex flex-row justify-content-start align-items-center">
                            <i className="fa-solid fa-link fs-22 me-3"></i>
                            <i className="fa-solid fa-share fs-22"></i>
                        </div>
                    </div>
                </div>
                <div className="container mt-2">
                    <div className="p-2 mt-3">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex flex-row justify-content-start">
                                    <div className="me-3">
                                        <img
                                            src={`${cdn_url}/${list?.img}`}
                                            alt={list?.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "10px",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-2 fs-18">{list?.name}</h6>
                                        <h6 className="fw-bold mb-2 fs-12">{list?.pname}</h6>
                                        <h6 className="fw-bold mb-1 fs-12">下载次数: {list?.dn_nm} </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 mt-2">
                        <div
                            dangerouslySetInnerHTML={{ __html: list?.content || "" }}
                        />
                    </div>
                    <ComDetailsSlider cdn_url={cdn_url} pics={list?.pics ?? []} />
                    <ComReletedProduct cdn_url={cdn_url} related={related ?? []}/>
                    <div className="space"></div>
                    <div className="bottom-btn">
                        <a target="_blank" rel="noreferrer" href={list?.androidurl}>
                            <button className="btn btn-primary w-100 btn-override border-0">
                                <i className="fa-solid fa-arrow-down me-2"></i> 下载
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
