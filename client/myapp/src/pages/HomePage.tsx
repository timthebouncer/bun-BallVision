import './App.css'
import {useCallback, useEffect, useRef, useState} from 'react'
import { Pagination } from "antd";
import Search from "antd/es/input/Search.js";
import MenuComponent from "../components/Menu";
import ballLogo from '../../public/ballLogo-round.png'
import axiosInstance from '../../utils/axiosInstance'
import Footer from "../components/footer/Footer.tsx";


type VIDEO = {
    id: string;
    title: string;
    intro: string;
    videoUrl: string;
}



function HomePage() {

    const [inputText, setInputText] = useState<string>('');
    const [videoList, setVideoList] = useState<VIDEO[]>([])
	const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(()=>{
        onGetVideoList()
    },[inputText])

    const onGetVideoList= async ()=>{

		const {data} = await axiosInstance.get(`api/getVideoList`, {params: {inputText}})

		setVideoList(data)
    }

	const handleIframeClick = useCallback(() => {
		console.log('Iframe clicked!');
	}, []);

	const attachClickListener = useCallback(() => {
		const iframe = iframeRef.current;
		if (iframe) {
			console.log('Iframe reference:', iframe);
			const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
			console.log(iframeDocument,'iframeDocument')
			if (iframeDocument) {
				console.log('Attaching click listener to iframe document');
				iframeDocument.addEventListener('click', handleIframeClick);
			} else {
				console.log('Iframe document is null');
			}
		} else {
			console.log('Iframe is null');
		}
	}, [handleIframeClick]);

	useEffect(() => {
		const iframe = iframeRef.current;
		if (iframe) {
			console.log('Adding load event listener to iframe');
			iframe.addEventListener('load', attachClickListener);

			// Cleanup event listener on component unmount
			return () => {
				const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
				if (iframeDocument) {
					iframeDocument.removeEventListener('click', handleIframeClick);
				}
				iframe.removeEventListener('load', attachClickListener);
			};
		} else {
			console.log('Iframe is null in useEffect');
		}
	}, [attachClickListener, handleIframeClick]);




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
						setInputText(e.target.value)
					}}
				/>
			</div>
			<div className="container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
				<div className="videoContainer">
					{videoList.map((item:VIDEO) => {
						return (
							<div className="video-wrapper" key={item.id}>
								<div className="iframe-wrapper">
									<iframe
										ref={iframeRef}
										style={{ border: "none" }}
										id={item.id}
										title="Inline Frame Example"
										width="100%"
										height="500"
										src={item.videoUrl}
										onLoad={attachClickListener}
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
					<Pagination defaultCurrent={1} total={videoList.length} />
				</div>
			</div>
			<Footer />
		</>
    )
}

export default HomePage
