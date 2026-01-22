import React from 'react'
export default function HomePage({components,title=""}) {
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
