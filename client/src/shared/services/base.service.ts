import Axios, { Method } from "axios";
import { Config } from "../../config/Config";

export class BaseService {
    API_URL = Config.getConfig().apiUrl;

    constructor() {
        Axios.interceptors.request.use(function (config) {
            const userData: any = localStorage.getItem('userData');
            if (userData) {
                const token = JSON.parse(userData).token;
                if (config && config.headers)
                    config.headers['x-auth-token'] = token;
            }

            return config;
        });
    }


    async httpClient(apiUrl: string, method: Method, body?: any, headers?: any, responseType?: any) {
        let url = `${this.API_URL}${apiUrl}`
        if(method == "GET" && body && Object.keys(body).length > 0){
            url += "?"
            Object.keys(body).forEach((key) => {
                if(body[key] && body[key] !== ""){
                    url+= `${key}=${body[key]}&`
                }
            });
        }
        const options = {
            url,
            method: method,
            data: body,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                ...headers
            },
        };

        return Axios.request<typeof responseType>(options);
    }
}