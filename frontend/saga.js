import { all, call, delay, put, take, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, failure, setAuctionList, setAuctionItemDetails, setLoginData, notify } from './actions';

import * as auctionsApiHelpers from './src/auctionsApiHelpers';

function* getToken() {
  const token = yield select(state => state.token);
  return token;
}

function* getAuctionListSaga({ payload } = {}) {
  try {
    const token = yield getToken();
    const data = yield auctionsApiHelpers.getAuctionItems({
      ...payload,
      token
    });
    yield put(setAuctionList(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* getAuctionItemDetailsSaga({ payload }) {
  try {
    const token = yield getToken();
    const data = yield auctionsApiHelpers.getAuctionItemDetails({
      ...payload,
      token
    });
    yield put(setAuctionItemDetails(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* loginSaga({ payload }) {
  try {
    const data = yield auctionsApiHelpers.login(payload);
    yield put(setLoginData({
      username: payload.username,
      ...data
    }));
  } catch (err) {
    yield put(failure(err));
  }
}

function* bidSaga({ payload }) {
  try {
    const token = yield getToken();
    const data = yield auctionsApiHelpers.bid({
      ...payload,
      token
    });
    yield put(notify(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_AUCTION_LIST, getAuctionListSaga),
    takeLatest(actionTypes.GET_AUCTION_ITEM_DETAILS, getAuctionItemDetailsSaga),
    takeLatest(actionTypes.LOGIN, loginSaga),
    takeLatest(actionTypes.BID, bidSaga),
  ]);
}

export default rootSaga;