type AddArticle = {
    title: string;
    intro: string;
    avatar: string;
    content: string[];
}

type UpdateArticleViewBody = {
    id: number;
}