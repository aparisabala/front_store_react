import React from 'react'
import { NavLink } from 'react-router-dom';
export default function FooterMenu() {
    return (
        <div className="footer-menu">
            <div className="position-relative w-100">
                <div className="d-flex flex-row justify-content-evenly">
                   <NavLink to="/" className={({ isActive }) =>isActive ? 'text-orange' : 'nav-link'}> 
                    <div className="d-block cursor-pointer text-center page">
                            <div>
                                <i className="fa fa-home icon-img cursor-pointer"></i>
                            </div>
                            <div className="footer-text cursor-pointer">首页</div>
                        </div>
                    </NavLink>
                    <NavLink to="/videos" className={({ isActive }) =>isActive ? 'text-orange' : 'nav-link'}> 
                    <div className="d-block cursor-pointer text-center page">
                        <div>
                            <i className="fa fa-video icon-img cursor-pointer"></i>
                        </div>
                        <div className="footer-text cursor-pointer">视频</div>
                    </div>
                    </NavLink>
                    <NavLink to="/brothel" className={({ isActive }) =>isActive ? 'text-orange' : 'nav-link'}> 
                    <div className="d-block cursor-pointer text-center page">
                        <div>
                            <i className="fa fa-heart icon-img cursor-pointer"></i>
                        </div>
                        <div className="footer-text cursor-pointer">青楼</div>
                    </div>
                    </NavLink>
                    <NavLink to="/live" className={({ isActive }) =>isActive ? 'text-orange' : 'nav-link'}> 
                    <div className="d-block cursor-pointer text-center page">
                        <div>
                            <i className="fa fa-search icon-img cursor-pointer"></i>
                        </div>
                        <div className="footer-text cursor-pointer">直播</div>
                    </div>
                    </NavLink>
                    <NavLink to="/make-money" className={({ isActive }) =>isActive ? 'text-orange' : 'nav-link'}> 
                    <div className="d-block cursor-pointer text-center page">
                        <div>
                            <i className="fa fa-wallet icon-img cursor-pointer"></i>
                        </div>
                        <div className="footer-text cursor-pointer">赚钱</div>
                    </div>
                    </NavLink>
                </div>
            </div>
        </div>

    )
}
