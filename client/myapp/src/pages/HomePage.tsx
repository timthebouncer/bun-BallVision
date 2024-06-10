import './App.css'
import {useEffect, useState} from 'react'
import { Pagination } from "antd";
import Search from "antd/es/input/Search.js";
import MenuComponent from "../components/Menu";
import {
	FacebookFilled,
	InstagramFilled,
	YoutubeFilled,
} from "@ant-design/icons";
import ballLogo from '../../public/ballLogo-round.png'

type VIDEO = {
    title: string;
    intro: string;
    videoUrl: string;
}



function HomePage() {

    // const [inputText, setInputText] = useState<string>('');
    const [videoList, setVideoList] = useState<VIDEO[]>([])

    useEffect(()=>{
        onGetVideoList()
    },[])

    const onGetVideoList= async ()=>{
        await fetch("http://localhost:3000/api/getVideoList")
            .then(response=>response.json())
            .then(data=>{
                setVideoList(data)
            })
            .catch(err=>{
                console.log(err,'err')
            })
    }

    


    return (
        <>
			<nav className="nav-wrapper">
				<div className="title">
					<MenuComponent />

					<div className="logo-wrapper">
						<a href="https://vitejs.dev">
							<img src={ballLogo} className="logo" alt="Vite logo" />
						</a>
						<h2 className='text-white'>BBall_Vision</h2>
					</div>
				</div>
			</nav>
			<div className="header">
				<Search
					placeholder="請輸入想要觀看的球星影片關鍵字"
					style={{ width: "20rem" }}
				/>
			</div>
			<div className="container">
				<div className="layout videoContainer">
					{videoList.map((item:VIDEO) => {
						return (
							<div className="video-wrapper">
								{/*<h3>{item.title}</h3>*/}
								<div className="iframe-wrapper">
									<iframe
										style={{ border: "none" }}
										id="inlineFrameExample"
										title="Inline Frame Example"
										width="100%"
										height="500"
										src={item.videoUrl}
									></iframe>
								</div>
								<div
									className={ "intro-text"}
								>
									{item.intro}
								</div>
							</div>
						);
					})}
				</div>
				{/*<div className="layout SideContainer">*/}
				{/*    <div>推薦影片</div>*/}
				{/*    <div>熱門影片</div>*/}
				{/*</div>*/}
				<div className="pagination">
					<Pagination defaultCurrent={1} total={videoList.length} />
				</div>
			</div>
			<div className="footer">
				<div className="about">
					<div className="footer-logo-wrapper">
						<a href="https://vitejs.dev">
							<img src={ballLogo} className="logo" alt="Vite logo" />
						</a>
						<h2 style={{ color: "#000" }}>BBall_Vision</h2>
					</div>
					<div className="service-wrapper">
						<div>
							收錄精華以及您不知道的NBA大小事
							<h4>籃球傳教士 | NBA消息 | 球員報導</h4>
						</div>
						<div className="service-info">
							<a href="">廣告合作</a>
							<a href="">服務條款及隱私權政策</a>
							<a href="">聯絡我們</a>
						</div>
					</div>
				</div>
				<div className="copyright">
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
			</div>
		</>
    )
}

export default HomePage
