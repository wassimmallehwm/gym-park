import { Method } from "axios";
import { BaseService } from '../../../../shared/services/base.service';

export class DashboardService extends BaseService {
    SRC_URL = "dashboard/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    getCounts(){
        return this.httpClient(this.httpUrl('counts'), "GET");
    }

    topCourses(){
        return this.httpClient(this.httpUrl('top-courses'), "GET");
    }
}

