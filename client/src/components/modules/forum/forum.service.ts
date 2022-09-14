import { Method } from "axios";
import { BaseService } from '../../../shared/services/base.service';

export class ForumService extends BaseService {
    SRC_URL = "forum/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    createForumPost(data: any){
        return this.httpClient(this.httpUrl(''), "POST", data);
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), "GET", query);
    }
    
    editForumPost(id: string, data: any){
        return this.httpClient(this.httpUrl(id), "PUT", data);
    }
    
    deleteForumPost(id: string){
        return this.httpClient(this.httpUrl(id), "DELETE");
    }
}

