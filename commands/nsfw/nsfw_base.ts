import * as gelbooru_api from "npm:gelbooru-api";

const gelbooru_client = new gelbooru_api.default();

export async function get_random_post(tags: string | undefined = undefined,): Promise<Post> {
    if (tags == undefined) {
        tags = "";
    }

    const res = await gelbooru_client.getRandomPost(tags, 10000, 0);

    return {
        id: res.id,
        created_at: res.created_at,
        source: res.source,
        tags: res.tags,
        file_url: res.file_url,
        status: res.status,
    };
}

export async function get_post(pid: number): Promise<Post> {
    const res = await gelbooru_client.getPostById(pid);

    return {
        id: res.id,
        created_at: res.created_at,
        source: res.source,
        tags: res.tags,
        file_url: res.file_url,
        status: res.status,
    };
}

export interface Post {
    id: number;
    created_at: string;
    source: string;
    tags: string;
    file_url: string;
    status: string;
}
