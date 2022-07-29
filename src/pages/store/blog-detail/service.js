import environment from "environments/environment";
import request from "util/request";

export async function getBlogListDetail(id) {
    return request(environment.api.blogList + `/${id}`, _, 'GET-ONE');

}