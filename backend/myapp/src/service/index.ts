
//業務邏輯

import {VideoDao} from "../dao/video.dao";
import {ContactDao} from "../dao/contact.dao";
import {ArticleDao} from "../dao/article.dao";

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

type AddArticle = {
    title: string
    intro: string
    avatar: string
    content: string
}

type Keyword = {
    keyword: string;
    pageSize?: number;
    pageNumber?: number;
}

type AddContact = {
    emailOrPhone: string
    request: string
}

export async function getVideosByText(query: Keyword) {
    const dao = new VideoDao()
    const response = await dao.getVideoList(query)
    return response
}

export function addVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.addVideo(params)
}

export function updateVideo(params: { id: string; videoUrl: string }) {
    const dao = new VideoDao()
    dao.updateVideo(params)
}

export function addContact(params: AddContact) {
    const dao = new ContactDao()
    dao.addContact(params)
}

export async function getArticleList() {
    const dao = new ArticleDao()
    const response = await dao.getArticleList()
    return response
}

export function getSingleArticle(id: string) {
    const dao = new ArticleDao()
    const response = dao.getSingleArticle(id)
    return response
}

export function getHottestArticle() {
    const dao = new ArticleDao()
    const response = dao.getHottestArticle()
    return response
}

export function addArticle(params: AddArticle) {
    const dao = new ArticleDao()
    dao.addArticle(params)
}

export function updateArticleView(id: string) {
    const dao = new ArticleDao()
    dao.updateArticleView(id)
}


