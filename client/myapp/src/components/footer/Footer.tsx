import './index.css'
import {FacebookFilled, InstagramFilled, YoutubeFilled} from "@ant-design/icons";
import CustomModal from "../modal";
import {useState} from "react";
import { Link } from "react-router-dom";
import * as React from "react";

const Footer=()=>{

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOpenContactModal=()=>{
        setIsModalOpen(true)
    }

    const modalCallback=(type:string, value: any)=>{
        if(type === 'submit'){
            console.log(value)
        } else {
            setIsModalOpen(false)
        }
    }


    return (
        <div className="footer">
            <div className="about sm:flex">
                <div className="footer-logo-wrapper">
                    <div>
                        <iframe className="iframe-fb border"
                                allow="encrypted-media"
                                height={70}
                                src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=100090875560321&tabs=timeline&width=300&height=50&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=2235597906716847">

                        </iframe>
                    </div>
                </div>
                <div className="service-wrapper">
                    <div className="service-info sm:items-end">
                        <Link to="/serviceTerms" relative="path">
                            服務條款及隱私權政策
                        </Link>
                        <div onClick={onOpenContactModal} className='cursor-pointer'>聯絡我們</div>
                    </div>
                </div>
            </div>
            <div className="copyright block p-4 md:p-12 text-xs sm:flex sm:justify-between sm:items-center">
                <div>@_bball_vision 籃球視界 版權所有</div>
                <div className="social-icon-wrapper">
                    <a href="https://www.facebook.com/profile.php?id=100090875560321" className="social-icon">
                        <FacebookFilled className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/_bball_vision/">
                        <InstagramFilled className="social-icon" />
                    </a>
                    <a href="https://www.youtube.com/@_bball_vision">
                        <YoutubeFilled className="social-icon" />
                    </a>
                </div>
            </div>
            <CustomModal
                isModalOpen={isModalOpen}
                modalCallback={modalCallback}
                title={'聯絡我們'}
            />
        </div>
    )
}

export default Footer