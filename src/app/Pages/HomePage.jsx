import React from 'react';
import { useEffect } from 'react';
import sendTongji from './../Lib/analytics/sendTongji';
export default function HomePage({components,title=""}) {
     useEffect(() => {
        async function fetchAndSend() {
            try {
                sendTongji("","download",{sendType: 'install',uri: 'data/install'});
            } catch (err) {
                console.error("Fetch/send error:", err);
            }
        }
        fetchAndSend();
    },[]);
    return (
        <React.Fragment>
            <div className="wrap">
                {
                    (title != '') &&
                    <div className="gradient-box mb-3 m-0"><h5 class="m-0 p-2 text-dark text-center fw-bold"> {title} </h5></div>
                }
                {
                    components.map(({ Component, classNames="",query="" }, index)=>{
                        return(
                            <div className={classNames} key={index}>
                                <Component query={query} title={title}/>
                            </div>
                        )
                    })
                }
                <div className="space"></div>
            </div>
        </React.Fragment>
    )
}
