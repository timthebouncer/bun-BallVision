//業務邏輯
import {VideoDao} from "../dao/video.dao";
import {ContactDao} from "../dao/contact.dao";
import {ArticleDao} from "../dao/article.dao";
import {UserDao} from "../dao/user.dao";


export async function getVideosByText(query: Keyword) {
    const dao = new VideoDao()
    const response = await dao.getVideoList(query)
    return response
}

export function addVideo(params: UploadVideoText) {
    const dao = new VideoDao()
    dao.addVideo(params)
}

export function updateVideo(params: { id: number; videoUrl: string }) {
    const dao = new VideoDao()
    dao.updateVideo(params)
}

export function addContact(params: AddContact) {
    const dao = new ContactDao()
    dao.addContact(params)
}

export async function getArticleList(query: ArticleSearch) {
    const dao = new ArticleDao()
    const response = await dao.getArticleList(query)
    return response
}

export function getSingleArticle(id: number) {
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

export function deleteArticle(query: {id: number}) {
    const dao = new ArticleDao()
    dao.deleteArticle(query.id)
}

export function updateArticleView(id: number) {
    const dao = new ArticleDao()
    dao.updateArticleView(id)
}

export function updateArticle(params: UpdateArticleBody) {
    const dao = new ArticleDao()
    dao.updateArticle(params)
}

export async function userCheck(password: string){
    const dao = new UserDao()
    const response = await dao.userCheck(password)
    return response
}


