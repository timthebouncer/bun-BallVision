
//業務邏輯

import {VideoDao} from "../dao/video.dao";

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

export async function getVideosByText(text: String) {
    const dao = new VideoDao()
    const list = await dao.getVideoList(text)
    console.log(list,'list')
    return list
    // return list.filter(e => e.id === text)
}

export function addVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.addVideo(params)

    // return list.filter(e => e.id === text)
}

export function updateVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.updateVideo(params)

    // return list.filter(e => e.id === text)
}