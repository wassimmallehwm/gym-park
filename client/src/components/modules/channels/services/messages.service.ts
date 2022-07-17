import { BaseService } from '../../../../shared/services/base.service';

export class MessagesService extends BaseService {
    SRC_URL = "messages/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    findByChannel(channelId: string, offset?: Number){
        const url = offset ? `${channelId}?offset=${offset}` : channelId
        return this.httpClient(this.httpUrl(url), 'GET');
    }

    createMessage(data: any){
        return this.httpClient(this.httpUrl(``), 'POST', data);
    }
}

