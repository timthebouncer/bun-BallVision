
//業務邏輯

import {VideoDao} from "../dao/video.dao";
import {ContactDao} from "../dao/contact.dao";

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
