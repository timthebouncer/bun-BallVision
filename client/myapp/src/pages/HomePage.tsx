import './App.css'
import {useCallback, useEffect, useRef, useState} from 'react'
import { Pagination } from "antd";
import Search from "antd/es/input/Search.js";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import axiosInstance from '../../utils/axiosInstance'
import Footer from "../components/footer/Footer.tsx";
import {ArrowUpOutlined} from "@ant-design/icons";
import * as React from "react";
import {s} from "vite/dist/node/types.d-aGj9QkWt";


type VIDEO = {
    id: string;
    title: string;
    intro: string;
    videoUrl: string;
}

type Keyword = {
	keyword: string;
	pageSize: number
	pageNumber: number
}


const initState={
	keyword: '',
	pageSize: 5,
	pageNumber: 1
}



function HomePage() {

    const [searchParams, setSearchParams] = useState<Keyword>(initState);
    const [videoList, setVideoList] = useState<VIDEO[]>([])
    const [totalElement, setTotalElement] = useState<number>(0)

	const googleApiUrl=(videoId)=> `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyDp6gxoL8x0RxqAtl6NQ4VMF7wVTxP1Pt4`


	const getViews=async ()=>{
		const data = await axiosInstance.get(googleApiUrl('AqrpddAz8oc'))

		console.log(data,'data')
	}


	useEffect(() => {
		getViews()

	}, []);

    useEffect(()=>{
        onGetVideoList()
    },[searchParams])

    const onGetVideoList= async ()=>{
		const {data} = await axiosInstance.get(`api/getVideoList`, {params: {...searchParams}})
		setVideoList(data.list)
		setTotalElement(data.totalElement)
    }


    return (
        <>
			<nav className="nav-wrapper">
				<div className="title">
					<MenuComponent />

					<div className="logo-wrapper">
						<a href="/">
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
						setSearchParams({...searchParams, keyword: e.target.value})
					}}
				/>
			</div>
			<div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl relative">
				<div className="videoContainer">
					{videoList.map((item:VIDEO) => {
						return (
							<div className="video-wrapper" key={item.id}>
								<div className="iframe-wrapper">
									<iframe
										style={{ border: "none" }}
										id={item.id}
										title="Inline Frame Example"
										width="100%"
										height="500"
										src={item.videoUrl}
									>
									</iframe>


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
				<div className="pagination">
					<Pagination
						defaultCurrent={searchParams.pageNumber}
						defaultPageSize={searchParams.pageSize}
						total={totalElement}
						onChange={(e)=>{
							setSearchParams({...searchParams, pageNumber: e})
						}}
					/>
				</div>

			</div>
			<Footer />

		</>
    )
}

export default HomePage
