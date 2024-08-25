export type SaveArticle = {
    data: string[] | undefined;
    pos: number,
    page: number
}

export type Articles = {
    header: string[];
    data: string[][];
    length: number;
}