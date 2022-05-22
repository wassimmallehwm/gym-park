import Axios from 'axios';
import { Config } from '../../../config/Config';
import { BaseService } from '../../../shared/services/base.service';

const API_URL = "users/";
const baseService = new BaseService()

export const authenticate = (data) => {
    return baseService.httpClient(API_URL + "login", 'POST', data)
}
