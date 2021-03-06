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


    async httpClient(
        apiUrl: string,
        method: Method,
        body?: any,
        headers?: any,
        responseType?: any,
        uploadReq?: boolean,
        uploadCallback?: any
        ) {
        let url = `${this.API_URL}${apiUrl}`
        if(method == "GET" && body && Object.keys(body).length > 0){
            url += "?"
            Object.keys(body).forEach((key, i) => {
                if(body[key] && body[key] !== ""){
                    if(i === 0){
                        url+= `${key}=${body[key]}`
                    } else {
                        url+= `&${key}=${body[key]}`
                    }
                }
            });
        }
        const options = {
            url,
            method: method,
            data: body || null,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                ...headers
            },
            onUploadProgress: uploadReq ? uploadCallback : null
        };

        return Axios.request<typeof responseType>(options);
    }
}