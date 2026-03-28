import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Remote } from '../Lib/Remote';
import React, { useEffect, useState } from 'react'
import { decryptServerData } from "../Lib/decryptServerData";
export default function Announcement({query}) {
    const [loading, setLoading] = useState(true);
    const [dbData, setDbResponse] = useState([]);
    useEffect(() => {
        async function fetchAndSend() {
            try {
                const { data, status } = await Remote.get(query);
                if (status === 200) {
                    const result = decryptServerData(data);
                    if(result?.status == 200) {
                        setDbResponse(result?.announce);
                        setLoading(false);
                    } 
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
          </div>
        )
    }
    return (
        <div className='container-fluid mq-bg'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="marquee">
                        <div className="marquee-content">
                            <span className="marquee-text">{dbData}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
