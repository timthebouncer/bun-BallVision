import Search from "antd/es/input/Search.js";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import * as React from "react";

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
    category: string
}

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer 777`,
}

const UploadVideo=()=>{

    const [textParams, setTextParams] = useState<UploadVideoText>({
        title: '',
        intro: '',
        videoUrl: '',
        category: ''
    })

    const onHandleChange=(type:string, e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setTextParams({...textParams, [type]: value})
    }


    const submit=async ()=>{
        const payload={
            title: textParams.title,
            intro: textParams.intro,
            videoUrl: textParams.videoUrl,
            category: textParams.category,
        }

        await axiosInstance.post('api/addVideo', payload)

    
    }

    


    return(
        <div className="flex flex-col items-center justify-center h-full">
            <Search
                    className="mb-10"
					placeholder="請輸影片標題"
					style={{ width: "20rem" }}
                    onChange={(e)=>onHandleChange('title', e)}
				/>
            <Search
                className="mb-10"
                placeholder="請輸入影片介紹"
                style={{ width: "20rem" }}
                onChange={(e)=>onHandleChange('intro', e)}
            />
            <Search
                className="mb-10"
                placeholder="請輸入影片URL"
                style={{ width: "20rem" }}
                onChange={(e)=>onHandleChange('videoUrl', e)}
            />
            <Search
                className="mb-10"
                placeholder="請輸入分類"
                style={{ width: "20rem" }}
                onChange={(e)=>onHandleChange('category', e)}
            />
             <Button type="primary" onClick={submit}>送出</Button>
        </div>
    )
    

}

export default UploadVideo