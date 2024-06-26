import './App.css'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Button, Pagination} from "antd";
import Search from "antd/es/input/Search.js";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import axiosInstance from '../../utils/axiosInstance'
import Footer from "../components/footer/Footer.tsx";
import {ArrowUpOutlined} from "@ant-design/icons";
import * as React from "react";
import {navList} from "../../data/navList.js"
import {Link} from "react-router-dom";


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
	const [activeNav, setActiveNav] = useState(null);


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
					<div className="pl-4">
						<Search
							placeholder="請輸入想要觀看的球星影片關鍵字"
							style={{ width: "20rem" }}
							onChange={e=> {
								setSearchParams({...searchParams, keyword: e.target.value})
							}}
						/>
					</div>
					<div className='flex-1 flex justify-end'>
						<iframe className="iframe-fb border"
								allow="encrypted-media"
								height={70}
								src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=100090875560321&tabs=timeline&width=400&height=50&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=2235597906716847">

						</iframe>
					</div>
				</div>
			</nav>
			<div className="header" onMouseLeave={()=>{
				setActiveNav(null)
			}}>
				{
					navList.map(el=>{
						return (
							<div key={el.id}  className='relative'>
								<div>
									<Link to="/articles" relative="path">
										<Button
											className={'button'}
											onMouseEnter={()=>{
												setActiveNav(el.id)
											}}
										>
											{el.name}
										</Button>
									</Link>
								</div>
								{
									activeNav === el.id && (
										<div className='absolute top-14 -left-1 z-20'>
											{(el.subList || []).map((sub) => {
												return <Button key={sub.id} className="subButton">
													{sub.name}
												</Button>
											})}
										</div>
								)}
							</div>
						)
					})
				}
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
