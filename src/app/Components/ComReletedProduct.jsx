import React from 'react'
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function ComReletedProduct({ related, cdn_url }) {
    const goToProduct = useNavigateToProduct();
    if (!related || related.length === 0) return null;
    return (
        <>
            <div className="container mt-3">
                <div>
                    <h4 className="fs-15 mb-2">热门推荐</h4>
                </div>
            </div>

            <div className="container-fluid mb-3">
                <div className="d-flex flex-wrap recon-row">
                    {related.map((item) => (
                        <div
                            className="recon-item viewDetails"
                            data-id={item.id}
                            key={item.id}
                            onClick={() => {goToProduct(item)}}
                        >
                            <div className="d-flex justify-content-center">
                                <img
                                    alt=""
                                    className="img-fluid"
                                    src={`${cdn_url}/${item.img}`}
                                />
                            </div>
                            <div className="fs-11 fw-bold mt-1 text-center fixProductNameHeight">
                                {item?.new_name}
                            </div>
                            <div className="mt-1">
                                <span className="d-flex justify-content-center align-items-center install-btn fs-12 cursor-pointer">
                                    <i className="fa fa-arrow-down"></i>
                                    <span>下载</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
