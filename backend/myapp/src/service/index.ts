
//業務邏輯

import {VideoDao} from "../dao/video.dao";
import {ContactDao} from "../dao/contact.dao";

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

type Keyword = {
    keyword: string;
    pageSize: number
    currentPage: number
}

export async function getVideosByText(query: Keyword) {
    const dao = new VideoDao()
    const response = await dao.getVideoList(query)
    console.log(response,'response')
    return response
}

export function addVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.addVideo(params)
}

export function updateVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.updateVideo(params)
}

export function addContact(params: UploadVideoText) {
    const dao = new ContactDao()
    dao.addContact(params)
}
