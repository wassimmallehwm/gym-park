// import Axios from 'axios';
// import config from '../../../config/config';

// const API_URL = config.apiUrl + "users/";

// export const interceptToken = (callback, logout) => {
//     Axios.interceptors.response.use(null, (error) => {
//         if (
//             error.config &&
//             error.response?.status === 401 &&
//             error.response?.data?.msg === "token_expired" &&
//             !error.config.__isRetry
//         ) {
//             return new Promise((resolve, reject) => {
//                 refreshToken(error.config, callback, logout)
//                     .then((result) => {
//                         resolve(result);
//                     })
//                     .catch((err) => {
//                         reject(err);
//                     });
//             });
//         }
//         return Promise.reject(error);
//     });
// }

// const refreshToken = (config, callback, logout) => {
//     return new Promise((resolve, reject) => {
//         refresh(config.headers["x-auth-token"]) // Endpoint to request new token
//             .then((res) => {
//                 config.headers["x-auth-token"] = callback(res.data);
//                 Axios
//                     .request(config) // Repeat the initial request
//                     .then((result) => {
//                         return resolve(result);
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                         return reject(err);
//                     });
//             })
//             .catch((err) => {
//                 console.log(err);
//                 logout();
//             });
//     });
// };

// export const uploadUserImage = (token, data) => {
//     return Axios.post(API_URL + "upload", data, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const updateUser = (token, data) => {
//     console.log(data)
//     return Axios.post(API_URL + "update", data, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const changeUserPassword = (token, data) => {
//     return Axios.post(API_URL + "change-password", data, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const register = (data) => {
//     return Axios.post(API_URL + "register", data);
// }

// export const login = (data) => {
//     return Axios.post(API_URL + "login", data);
// }

// export const findAll = (token, query) => {
//     return Axios.post(API_URL + "findall", query, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const findOne = (token, id) => {
//     return Axios.post(API_URL + id, null, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const refresh = (token) => {
//     return Axios.post(API_URL + "refresh", null, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const remove = (token, data, id) => {
//     return Axios.post(API_URL + "remove/" + id, data, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const removeUser = (token, id) => {
//     return Axios.post(API_URL + "remove-user/" + id, null, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const addOrUpdateUser = (token, mode, data) => {
//     return Axios.post(API_URL + mode, data, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const searchUser = (token, query) => {
//     return Axios.get(API_URL + 'search?query=' + query, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const userPhotos = (token, id) => {
//     return Axios.get(API_URL + 'photos/' + id, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const chnagePicture = (token, image) => {
//     return Axios.post(API_URL + 'photos/change', image, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }

// export const removePicture = (token, image) => {
//     return Axios.post(API_URL + 'photos/remove', image, {
//         headers: {
//             "x-auth-token": token
//         }
//     });
// }



import { Method } from "axios";
import { Config } from "../../../config/Config";
import { BaseService } from '../../../shared/services/base.service';

export class UsersService extends BaseService {
    SRC_URL = "users/";

    constructor() {
        super();
    }

    private http(apiUrl: string, method: Method, body?: any, headers?: any) {
        return this.httpClient(`${this.SRC_URL}${apiUrl}`, method, body, headers)
    }

    authenticate(data: any){
        return this.http('login', 'POST', data);
    }

    findAll(query: any){
        return this.http('findall', 'POST', query);
    }

    list(query: any){
        return this.http('list', 'GET', query);
    }

    findOne(id: string){
        return this.http(id, 'GET');
    }
    removeUser(id: string){
        return this.http(id, 'DELETE');
    }
    
    addOrUpdateUser(mode: string, data: any){
        const method = mode == "add" ? "POST" : "PUT"
        const url = mode == "add" ? "" : data._id
        return this.http(url, method, data);
    }


    //ROLES list

    findRoles(){
        return this.httpClient(`roles`, "GET")
    }
}

