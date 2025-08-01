import { APICore } from '../../helper/api/apiCore';
import * as URL from '../../helper/api/apiEndPoint';
const api = new APICore();

export function createBookingApi(params: any): any {
    const { data } = params;
    return api.create(`${URL.createBooking}?userId=${data.userId}`, data)
}

export function getBookingApi(params: any): any {
    const { data } = params;
    return api.get(`${URL.getBooking}?id=${data}`);
}
export function updateBookingApi(params: any): any {
    const { data } = params;
    return api.update(`${URL.updateBooking}?id=${data}`);
}
export function cancelBookingApi(params: any): any {
    const { data } = params;
    return api.delete(`${URL.cancelBooking}?id=${data}`);
}
