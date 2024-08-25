export type SaveArticle = {
    data: string[] | undefined;
    pos: number;
    page: number;
    pageSize: number;
}

export type Articles = {
    header: string[];
    data: string[][];
    length: number;
}

export type ArticlesResponse = {
    message: string;
    articles: Articles;
}

