import environment from "environments/environment";
import request from "util/request";

export async function getDashboardAdmin(params) {
    return request(environment.api.adminDashboard, {}, 'GET');
}