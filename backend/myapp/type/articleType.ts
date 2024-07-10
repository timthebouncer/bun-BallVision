type AddArticle = {
    title: string;
    intro: string;
    avatar: string;
    content: string[];
    category: string;
}

type UpdateArticleViewBody = {
    id: number;
}