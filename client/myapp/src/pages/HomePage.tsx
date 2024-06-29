import './App.css'
import {useState} from 'react'
import {Button, Pagination} from "antd";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import Footer from "../components/footer/Footer.tsx";
import * as React from "react";
import {navList} from "../../data/navList.js"
import {Link} from "react-router-dom";
import {CarouselCompo} from "../components/carousel/Carousel.tsx";
import Articles from "./articleList/Articles";



function HomePage() {

	const [activeNav, setActiveNav] = useState(null);


    return (
        <>
			<nav className="nav-wrapper">
				<div className="title">
					<div className="block sm:hidden">
						<MenuComponent />
					</div>

					<div className="logo-wrapper">
						<a href="/">
							<img src={ballLogo} className="logo" alt="Vite logo" />
						</a>
						<h2 className='text-white'>BBall_Vision</h2>
					</div>
				</div>
			</nav>
			<div className="hidden sm:flex justify-center items-center py-6 bg-[#190f23]" onMouseLeave={()=>{
				setActiveNav(null)
			}}>
				{
					navList.map(el=>{
						return (
							<div key={el.id}  className='relative'>
								<div>
									<Link to="/video" relative="path">
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
			<div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
				<div className={'flex'}>
					<div style={{userSelect: 'none'}} className={'w-5/6 mr-8'}>
						<div className={'mb-8'}>
							<CarouselCompo />
						</div>

						<Articles />
					</div>
					<div className={'bg-white w-2/6 py-6 px-6'}>
						<div>
							熱門文章
						</div>
						<div className={'border-b mt-8'}>
							<a href="">
								巴黎奧運 / 完全體日本隊！八村壘、渡邊雄太領銜日本隊大名單
							</a>
						</div>
						<div className={'border-b mt-8'}>
							<a href="">
								球團虧損近億台幣！PLG和T1合併關鍵原因曝光
							</a>
						</div>
						<div className={'border-b mt-8'}>
							<a href="">
								NBA / 前勇士GM爆料 Rich Paul警告各球團別選走Bronny 否則將帶他去澳洲打球
							</a>
						</div>
					</div>
				</div>


			</div>

			<Footer />
		</>
    )
}

export default HomePage
