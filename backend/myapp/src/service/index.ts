
//業務邏輯

import {VideoDao} from "../dao/video.dao";

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

export async function getVideosByText(text) {
    const dao = new VideoDao()
    const list = await dao.getVideoList()
    console.log(list,'list')
    return list
    // return list.filter(e => e.id === text)
}

export function addVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.addVideo(params)

    // return list.filter(e => e.id === text)
}