import { Method } from "axios";
import { Config } from "../../../config/Config";
import { BaseService } from '../../../shared/services/base.service';

export class CoursesService extends BaseService {
    SRC_URL = "courses/";

    constructor() {
        super();
    }

    private http(apiUrl: string, method: Method, body?: any, headers?: any, responseType?: any, uploadReq?: boolean, uploadCallback?: any) {
        return this.httpClient(`${this.SRC_URL}${apiUrl}`, method, body, headers, responseType, uploadReq, uploadCallback)
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

    findFullById(id: string){
        return this.http(`${id}/full`, 'GET');
    }

    removeCourse(id: string){
        return this.http(id, 'DELETE');
    }
    
    addOrUpdateCourse(mode: string, data: any){
        const method = mode == "add" ? "POST" : "PUT"
        const url = mode == "add" ? "" : data._id
        return this.http(url, method, data);
    }

    addCourseMedia(id: string, data: FormData, uploadCallback: any){
        return this.http(`media/${id}`, 'POST', data, {}, null, true, uploadCallback);
    }

    editCourseMedia(courseId: string, mediaId: string, data: FormData, uploadCallback: any){
        return this.http(`media/${courseId}/${mediaId}`, 'PUT', data, {}, null, true, uploadCallback);
    }

    removeCourseMedia(courseId: string, mediaId: string){
        return this.http(`media/${courseId}/${mediaId}`, 'DELETE');
    }
}

