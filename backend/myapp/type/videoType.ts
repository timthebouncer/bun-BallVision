type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
    category: string
}

type UpdateVideo = {
    id: number
    videoUrl: string
}

type Keyword = {
    keyword: string;
    pageSize?: number;
    pageNumber?: number;
}