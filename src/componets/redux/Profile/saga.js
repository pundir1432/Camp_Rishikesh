// import { toast } from "react-toastify";
// import { getuserApi, saveBidApi, updateProfileApi, } from "./api";
// import { ProductActionTypes } from "./constants"
// import { all, fork, put, takeEvery, call, delay } from 'redux-saga/effects';
// import ToastHandle from "../../helper/ToastMessage";
// /**
//  * Login the user
//  * @param {*} payload - username and password
//  */
// function* updateProfileFunction(data) {
//     try {
//         yield put({
//             type: ProductActionTypes.UPDATE_PROFILE_LOADING,
//         });
//         const response = yield call(updateProfileApi, data);
//         if (response.status === 200) {
//             yield put({
//                 type: ProductActionTypes.UPDATE_PROFILE_SUCCESS,
//                 payload: response.data, // ✅ only send data
//             });
//         } else {
//             yield put({
//                 type: ProductActionTypes.UPDATE_PROFILE_ERROR,
//                 payload: response.data, // or response.message
//             });
//         }
//     } catch (error) {
//         yield put({
//             type: ProductActionTypes.UPDATE_PROFILE_ERROR,
//             payload: error?.response?.data || error,
//         });
//     }
// }

// function* getUserFunction(data) {
//     try {
//         yield put({
//             type: ProductActionTypes.GET_USER_LOADING,
//             payload: {},
//         });

//         const response = yield call(getuserApi, data);
//         if (response.status === 200) {
//             yield put({
//                 type: ProductActionTypes.GET_USER_SUCCESS,
//                 payload: response.data.user, // ✅ only send data
//             });
//         } else {
//             yield put({
//                 type: ProductActionTypes.GET_USER_ERROR,
//                 payload: response.data,
//             });
//         }
//     } catch (error) {
//         yield put({
//             type: ProductActionTypes.GET_USER_ERROR,
//             payload: error,
//         });
//     }
// }

// export function* watchProfile() {
//     yield takeEvery(ProductActionTypes.UPDATE_PROFILE_FIRST, updateProfileFunction)
//     yield takeEvery(ProductActionTypes.GET_USER_FIRST, getUserFunction)
// };

// function* ProfileSaga() {
//     yield all([
//         fork(watchProfile),
//     ]);
// }
// export default ProfileSaga;
