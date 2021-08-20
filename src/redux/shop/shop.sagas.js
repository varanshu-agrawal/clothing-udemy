import { takeEvery, call, put, all } from "redux-saga/effects";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,

} from './shop.actions'

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get()
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot)
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }


    // collectionRef
    //     .get()
    //     .then(snapShot => {
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //         dispatch(fetchCollectionsSuccess(collectionsMap));
    //     })
    //     .catch(error => dispatch(fetchCollectionsFailure(error.message)))

}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}