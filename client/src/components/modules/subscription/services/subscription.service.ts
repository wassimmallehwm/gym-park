import { BaseService } from '../../../../shared/services/base.service';

export class SubscriptionsService extends BaseService {
    SRC_URL = "subscriptions/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    create(data: any){
        return this.httpClient(this.httpUrl(''), "POST", data);
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), "GET", query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }
    
    approve(id: string){
        return this.httpClient(this.httpUrl(`approve/${id}`), "PUT", null);
    }
    
    reject(id: string){
        return this.httpClient(this.httpUrl(`reject/${id}`), "PUT", null);
    }

}

