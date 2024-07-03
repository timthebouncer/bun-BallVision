import './App.css'
import {useEffect, useState} from 'react'
import {Button} from "antd";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import Footer from "../components/footer/Footer.tsx";
import {navList} from "../../data/navList.tsx"
import {Link} from "react-router-dom";
import {CarouselCompo} from "../components/carousel/Carousel.tsx";
import Articles from "./articleList/Articles";
import axiosInstance from "../../utils/axiosInstance";

type ARTICLE={
	id: string
	avatar: string
	title: string
	intro: string
	content: string
	views: number
}




function HomePage() {

	const [activeNav, setActiveNav] = useState<string | null>(null);

	const [articleList, setArticleList] = useState<ARTICLE[]>([])
	const [hotArticleList, setHotArticleList] = useState<ARTICLE[]>([])
	const [, setTotalElement] = useState<number>(0)


	const onGetArticleList= async ()=>{
		const {data} = await axiosInstance.get(`api/getArticle`)
		setArticleList(data.list)
		setTotalElement(data.totalElement)
	}
	const onHottestArticleList= async ()=>{
		const {data} = await axiosInstance.get(`api/getHottestArticle`)
		setHotArticleList(data.list)
	}

	const onUpdateArticleView=(id:string)=>{
		axiosInstance.put('api/updateArticleView', {id: id})
	}

	useEffect(()=>{
		onGetArticleList()
		onHottestArticleList()
	},[])


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
						{
							articleList.length > 0 && <div className={'mb-8'}>
								<CarouselCompo articleList={articleList} />
							</div>
						}


						<Articles articleList={articleList} />
					</div>
					<div className={'bg-white w-2/6 py-6 px-6'}>
						<div>
							熱門文章
						</div>
						{
							hotArticleList?.length > 0 && hotArticleList.map(item=>{
								return (
									<Link
										to={`/articles/${item.id}`}
										onClick={()=>onUpdateArticleView(item.id)}
										key={item.id}
										className={'border-b mt-8 flex'}
									>
										{item.title}
									</Link>

								)
							})
						}
					</div>
				</div>


			</div>

			<Footer />
		</>
    )
}

export default HomePage
