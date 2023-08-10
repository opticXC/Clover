import * as gelbooru_api from "npm:gelbooru-api";


export const gelbooru_client = new gelbooru_api.default();




export async function get_random_post(tags:string){
    if (tags == undefined){
        tags = "";
    }

}


