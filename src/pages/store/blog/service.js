import environment from "environments/environment";
import request from "util/request";

export async function getBlogList(payload) {
    return request(environment.api.blogList, payload, 'GET');
}