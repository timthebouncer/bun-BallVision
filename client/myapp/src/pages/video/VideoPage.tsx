import './video.css'
import {useEffect, useState} from "react";
import axiosInstance from "../../../utils/axiosInstance.ts";
import {Pagination} from "antd";
import Search from "antd/es/input/Search";


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

const VideoPage=()=>{
    const [searchParams, setSearchParams] = useState<Keyword>(initState);
    const [videoList, setVideoList] = useState<VIDEO[]>([])
    const [totalElement, setTotalElement] = useState<number>(0)


    useEffect(()=>{
        onGetVideoList()
    },[searchParams])

    const onGetVideoList= async ()=>{
        const {data} = await axiosInstance.get(`/getVideoList`, {params: {...searchParams}})
        setVideoList(data.list)
        setTotalElement(data.totalElement)
    }

    return (
            <div>
                <div className="flex justify-center flex-1 py-8">
                    <Search
                        placeholder="請輸入想要觀看的球星影片關鍵字"
                        style={{ width: "20rem" }}
                        onChange={e=> {
                            setSearchParams({...searchParams, keyword: e.target.value})
                        }}
                    />
                </div>

                <div className="videoPageContainer sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl relative">
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

            </div>
    )

}

export default VideoPage