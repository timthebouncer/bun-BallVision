import './index.css'
import ballLogo from "../../../public/ballLogo-round.png";
import {FacebookFilled, InstagramFilled, YoutubeFilled} from "@ant-design/icons";
import CustomModal from "../modal";
import {useState} from "react";


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
                    <a href="">
                        <img src={ballLogo} className="logo" alt="Vite logo" />
                    </a>
                    <h2 style={{ color: "#000" }}>BBall_Vision</h2>
                </div>
                <div className="service-wrapper">
                    <div>
                        收錄精華以及您不知道的NBA大小事
                        <h4>籃球傳教士 | NBA消息 | 球員報導</h4>
                    </div>
                    <div className="service-info sm:items-end">
                        <a href="">服務條款及隱私權政策</a>
                        <div onClick={onOpenContactModal}>聯絡我們</div>
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