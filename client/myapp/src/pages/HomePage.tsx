import './App.css'
import {useEffect, useState} from 'react'
import {Button} from "antd";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import Footer from "../components/footer/Footer.tsx";
import {navList} from "../../data/navList.tsx"
import {Link, useNavigate} from "react-router-dom";
import {CarouselCompo} from "../components/carousel/Carousel.tsx";
import Articles from "./articleList/Articles";
import axiosInstance from "../../utils/axiosInstance";



const initState={
	category: 'nba',
	pageSize: 5,
	pageNumber: 1
}


function HomePage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useState<ArticleSearch>(initState);
	const [articleList, setArticleList] = useState<ARTICLE[]>([])
	const [hotArticleList, setHotArticleList] = useState<ARTICLE[]>([])
	const [totalElement, setTotalElement] = useState<number>(0)


	const onGetArticleList= async ()=>{
		const {data} = await axiosInstance.get(`/getArticle`, {params: {...searchParams}})
		setArticleList(data.list)
		setTotalElement(data.totalElement)
	}
	const onHottestArticleList= async ()=>{
		const {data} = await axiosInstance.get(`/getHottestArticle`)
		setHotArticleList(data.list)
	}

	const onUpdateArticleView=(id:number)=>{
		axiosInstance.put('/updateArticleView', {id: id})
	}

	const handleCategory=(el:NavListItem)=>{
		if(el.id === 'video'){
			navigate('/video')
		} else if (el.id === 'shop') {
			window.open('https://www.hb-sport.com/')
		} else {
			setSearchParams({...searchParams, category: el.id})
		}
	}

	useEffect(()=>{
		onGetArticleList()
		onHottestArticleList()
	},[searchParams])


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
						<h2 className='text-white'>BBall_Vision😊😊😊</h2>
					</div>
				</div>
			</nav>
			<div className="hidden sm:flex justify-center items-center py-6 bg-[#190f23]">
				{
					navList.map(el=>{
						return (
							<div key={el.id}  className='relative'>
								<div>
									<Button
										className={'button'}
										onClick={()=>handleCategory(el)}
									>
										{el.name}
									</Button>
								</div>
							</div>
						)
					})
				}
			</div>
			<div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
				<div className={'flex justify-center'}>
					<div style={{userSelect: 'none'}} className={'w-full lg:w-5/6'}>
						{
							articleList.length > 0 && <div className={'mb-8'}>
								<CarouselCompo articleList={articleList} />
							</div>
						}
						<Articles
							articleList={articleList}
							searchParams={searchParams}
							setSearchParams={setSearchParams}
							totalElement={totalElement}
						/>
					</div>
					<div className={'hidden xl:block bg-white w-2/6 py-6 px-6 ml-4'}>
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

			<div className={'hidden sm:block'}>
				<Footer />
			</div>
		</>
    )
}

export default HomePage
