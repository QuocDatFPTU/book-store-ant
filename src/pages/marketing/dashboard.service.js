import environment from "environments/environment";
import request from "util/request";

export async function getDashboardMarketing(params) {
    return request(environment.api.marketingDashboard, {}, 'GET');
}