import { Method } from "axios";
import { BaseService } from '../../../shared/services/base.service';

export class ForumService extends BaseService {
    SRC_URL = "forum/";

    constructor() {
        super();
    }

    private http(apiUrl: string, method: Method, body?: any, headers?: any) {
        return this.httpClient(`${this.SRC_URL}${apiUrl}`, method, body, headers)
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    createForum(data: any){
        return this.httpClient(this.httpUrl(''), "POST", data);
    }

    findAll(query: any){
        return this.http('findall', 'POST', query);
    }

    list(query?: any){
        return this.http('list', 'GET', query);
    }

    findOne(id: string){
        return this.http(id, 'GET');
    }

    remove(id: string){
        return this.http(id, 'DELETE');
    }
}

