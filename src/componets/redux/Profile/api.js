import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';
const api = new APICore();

export function updateProfileApi(params: any): any {
    const { data } = params;
    return api.update(`${URL.updateProfile}`, data)
}

export function getuserApi(params: any): any {
    const { data } = params;
    return api.get(`${URL.getuser}?id=${data}`);
}
