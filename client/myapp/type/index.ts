type Keyword = {
    keyword: string;
    pageSize: number
    pageNumber: number
}

type ArticleSearch = {
    category: string;
    pageSize: number
    pageNumber: number
}

type VIDEO = {
    id: string;
    title: string;
    intro: string;
    videoUrl: string;
}


type ARTICLE={
    id: number
    avatar: string
    title: string
    intro: string
    content: string[]
    views: number
    category: string
}

type ShowEditorType = {
    isVisible: boolean
    content: string[]
    type: string
    avatar: string
    title: string
    intro: string
    category: string
}

type ModalParamsType = {
    showEditor: ShowEditorType
    setShowEditor: (p: {
        isVisible: boolean;
        id: number
        content: string[],
        type: string,
        avatar: string
        title: string
        intro: string
        category: string
    })=>void
    onGetArticleList:()=>void
}

type modalCallback = (action: 'submit' | 'cancel', data: any) => void;

type PropsType = {
    isModalOpen: boolean;
    modalCallback: modalCallback;
    title: string;
};

type SubListItem = {
    id: string;
    name: string;
}

type NavListItem = {
    id: string;
    name: string;
    subList?: SubListItem[];
    url: string;
}

interface ImageInsert {
    image: string;
}
interface TextInsert {
    insert: string;
}
interface ImageInsertWrapper {
    insert: ImageInsert;
}
type Insert = TextInsert | ImageInsertWrapper;


type EditorParamsType = {
    isVisible: boolean
    id: number
    content: string[]
    type: string
    avatar: string
    title: string
    intro: string
    category: string
}
