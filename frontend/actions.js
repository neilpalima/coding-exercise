export const actionTypes = {
  FAILURE: 'FAILURE',
  GET_AUCTION_LIST: 'GET_AUCTION_LIST',
  SET_AUCTION_LIST: 'SET_AUCTION_LIST',
  GET_AUCTION_ITEM_DETAILS: 'GET_AUCTION_ITEM_DETAILS',
  SET_AUCTION_ITEM_DETAILS: 'SET_AUCTION_ITEM_DETAILS',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_LOGIN_DATA: 'SET_LOGIN_DATA',
  BID: 'BID',
  NOTIFY: 'NOTIFY',
  RESET_NOTIFY: 'RESET_NOTIFY',
  RESET_FAILURE: 'RESET_FAILURE',
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  }
}

export function getAuctionList(payload) {
  return { type: actionTypes.GET_AUCTION_LIST, payload }
}

export function setAuctionList(payload) {
  return { type: actionTypes.SET_AUCTION_LIST, payload }
}

export function getAuctionItemDetails(payload) {
  return { type: actionTypes.GET_AUCTION_ITEM_DETAILS, payload }
}

export function setAuctionItemDetails(payload) {
  return { type: actionTypes.SET_AUCTION_ITEM_DETAILS, payload }
}

export function login(payload) {
  return { type: actionTypes.LOGIN, payload }
}

export function logout() {
  return { type: actionTypes.LOGOUT }
}

export function setLoginData(payload) {
  return { type: actionTypes.SET_LOGIN_DATA, payload }
}

export function bid(payload) {
  return { type: actionTypes.BID, payload }
}

export function notify(payload) {
  return { type: actionTypes.NOTIFY, payload }
}

export function resetNotify() {
  return { type: actionTypes.RESET_NOTIFY }
}
export function resetFailure() {
  return { type: actionTypes.RESET_FAILURE }
}