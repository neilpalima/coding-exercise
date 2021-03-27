import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

export const initialState = {
  token: null,
  username: false,
  auctionListData: {},
  auctionItemDetailsData: {},
  isLoadingData: false,
  loggingIn: false,
  bidding: false
}

export function reducer(state, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.FAILURE:
      const resetCredentials = action.error?.status === 401;
      return {
        ...state,
        ...{
          error: action.error,
          username: resetCredentials ? false : state.username,
          token: resetCredentials ? false : state.token,
          loggingIn: false,
          bidding: false
        },
      }

    case actionTypes.GET_AUCTION_LIST:
      return {
        ...state,
        ...{
          isLoadingData: true
        },
      }

    case actionTypes.SET_AUCTION_LIST:
      return {
        ...state,
        ...{
          auctionListData: action.payload,
          isLoadingData: false
        },
      }

    case actionTypes.GET_AUCTION_ITEM_DETAILS:
      return {
        ...state,
        ...{
          isLoadingData: true
        },
      }

    case actionTypes.SET_AUCTION_ITEM_DETAILS:
      return {
        ...state,
        ...{
          auctionItemDetailsData: action.payload,
          isLoadingData: false
        },
      }

    case actionTypes.BID:
      return {
        ...state,
        ...{
          bidding: true
        },
      }

    case actionTypes.LOGIN:
      return {
        ...state,
        ...{
          loggingIn: true
        },
      }

    case actionTypes.LOGOUT:
      return {
        ...initialState
      }

    case actionTypes.SET_LOGIN_DATA:
      return {
        ...state,
        ...{
          token: action.payload.token,
          username: action.payload.username
        },
      }

    case actionTypes.NOTIFY:
      return {
        ...state,
        ...{
          notificationMessage: action.payload.message,
          bidding: false
        },
      }

    case actionTypes.RESET_NOTIFY:
      return {
        ...state,
        ...{
          notificationMessage: null
        },
      }

    case actionTypes.RESET_FAILURE:
      return {
        ...state,
        ...{
          error: null
        },
      }

    default:
      return state
  }
};
