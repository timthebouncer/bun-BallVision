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
import axiosInstance from '../../utils/axiosInstance'
import Footer from "../components/footer/Footer.tsx";

type VIDEO = {
    title: string;
    intro: string;
    videoUrl: string;
}



function HomePage() {

    const [inputText, setInputText] = useState<string>('');
    const [videoList, setVideoList] = useState<VIDEO[]>([])

    useEffect(()=>{
        onGetVideoList()
    },[inputText])

    const onGetVideoList= async ()=>{
		console.log(inputText,'inputText')

		const params ={
			text: inputText,
			aa: 'aaa'
		}

		const {data} = await axiosInstance.get(`api/getVideoList`, {params: {inputText}})
		// const {data} = await axiosInstance.get(`api/getVideoList/${encodeURIComponent(JSON.stringify(params))}`)

		console.log(data,'data')
		setVideoList(data)
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
					onChange={e=> {
						setInputText(e.target.value)
					}}
				/>
			</div>
			<div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
				<div className="videoContainer">
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
			<Footer />
		</>
    )
}

export default HomePage
