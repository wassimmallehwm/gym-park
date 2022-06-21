import { Method } from "axios";
import { BaseService } from '../../../shared/services/base.service';

export class ChannelsService extends BaseService {
    SRC_URL = "channels/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    addOrUpdate(mode: string, data: any){
        const method = mode == "add" ? "POST" : "PUT"
        const url = mode == "add" ? "" : data._id
        return this.httpClient(this.httpUrl(url), method, data);
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), "GET", query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }

    remove(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }

    // findAll(query: any){
    //     return this.http('findall', 'POST', query);
    // }

    // remove(id: string){
    //     return this.http(id, 'DELETE');
    // }
}

