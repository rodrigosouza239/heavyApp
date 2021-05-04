import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import * as api from './api';

export const BUSINESS_SALES_REQUEST = 'app/business/BUSINESS_SALES_REQUEST';
export const BUSINESS_SALES_LOADING = 'app/business/BUSINESS_SALES_LOADING';
export const BUSINESS_SALES_SUCCESS = 'app/business/BUSINESS_SALES_SUCCESS';
export const BUSINESS_SALES_FAILURE = 'app/business/BUSINESS_SALES_FAILURE';

export const BUSINESS_PURCHARES_REQUEST = 'app/business/BUSINESS_PURCHARES_REQUEST';
export const BUSINESS_PURCHARES_LOADING = 'app/business/BUSINESS_PURCHARES_LOADING';
export const BUSINESS_PURCHARES_SUCCESS = 'app/business/BUSINESS_PURCHARES_SUCCESS';
export const BUSINESS_PURCHARES_FAILURE = 'app/business/BUSINESS_PURCHARES_FAILURE';

export const BUSINESS_SALES_BY_VEHICLE_REQUEST = 'app/business/BUSINESS_SALES_BY_VEHICLE_REQUEST';
export const BUSINESS_SALES_BY_VEHICLE_LOADING = 'app/business/BUSINESS_SALES_BY_VEHICLE_LOADING';
export const BUSINESS_SALES_BY_VEHICLE_SUCCESS = 'app/business/BUSINESS_SALES_BY_VEHICLE_SUCCESS';
export const BUSINESS_SALES_BY_VEHICLE_FAILURE = 'app/business/BUSINESS_SALES_BY_VEHICLE_FAILURE';

export const BUSINESS_HISTORY_REQUEST = 'app/business/BUSINESS_HISTORY_REQUEST';
export const BUSINESS_HISTORY_LOADING = 'app/business/BUSINESS_HISTORY_LOADING';
export const BUSINESS_HISTORY_SUCCESS = 'app/business/BUSINESS_HISTORY_SUCCESS';
export const BUSINESS_HISTORY_FAILURE = 'app/business/BUSINESS_HISTORY_FAILURE';

export const BUSINESS_VEHICLE_REQUEST = 'app/business/BUSINESS_VEHICLE_REQUEST';
export const BUSINESS_VEHICLE_LOADING = 'app/business/BUSINESS_VEHICLE_LOADING';
export const BUSINESS_VEHICLE_SUCCESS = 'app/business/BUSINESS_VEHICLE_SUCCESS';
export const BUSINESS_VEHICLE_FAILURE = 'app/business/BUSINESS_VEHICLE_FAILURE';
export const BUSINESS_VEHICLE_RESET = 'app/business/BUSINESS_VEHICLE_RESET';

export const BUSINESS_SEND_CHAT_REQUEST = 'app/business/BUSINESS_SEND_CHAT_REQUEST';
export const BUSINESS_SEND_CHAT_LOADING = 'app/business/BUSINESS_SEND_CHAT_LOADING';
export const BUSINESS_SEND_CHAT_SUCCESS = 'app/business/BUSINESS_SEND_CHAT_SUCCESS';
export const BUSINESS_SEND_CHAT_FAILURE = 'app/business/BUSINESS_SEND_CHAT_FAILURE';
export const BUSINESS_SEND_CHAT_RESET = 'app/business/BUSINESS_SEND_CHAT_RESET';

export const BUSINESS_NOTIFICATIONS_GET_REQUEST = 'app/business/BUSINESS_NOTIFICATIONS_GET_REQUEST';
export const BUSINESS_NOTIFICATIONS_GET_LOADING = 'app/business/BUSINESS_NOTIFICATIONS_GET_LOADING';
export const BUSINESS_NOTIFICATIONS_GET_SUCCESS = 'app/business/BUSINESS_NOTIFICATIONS_GET_SUCCESS';
export const BUSINESS_NOTIFICATIONS_GET_FAILURE = 'app/business/BUSINESS_NOTIFICATIONS_GET_FAILURE';

export const UPDATE_LAST_MESSAGE = 'app/business/UPDATE_LAST_MESSAGE';
export const UPDATE_LAST_MESSAGE_SUCCESS = 'app/business/UPDATE_LAST_MESSAGE_SUCCESS';

export const BUSINESS_USER = 'app/business/BUSINESS_USER';

export const BUSINESS_SET_PUSH_NOTIFICATION = 'app/business/BUSINESS_SET_PUSH_NOTIFICATION';

export const BUSINESS_UPDATE_BUYER_LAST_MESSAGE = 'app/business/BUSINESS_UPDATE_BUYER_LAST_MESSAGE';

const INITIAL_STATE = {
  push: null,
  sale: [],
  saleLoading: false,
  saleError: false,

  purchare: [],
  purchareLoading: false,
  purchareError: false,

  saleVehicle: [],
  saleVehicleLoading: false,
  saleVehicleError: false,

  history: [],
  historyLoading: false,
  historyError: false,

  vehicle: null,
  vehicleLoading: false,
  vehicleError: false,

  chatData: null,
  chatLoading: false,
  chatError: false,

  initialLoading: false,
  initialError: false,
  initialData: null,

  user: null,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case UPDATE_LAST_MESSAGE:
      return {
        ...state,
      };
    case UPDATE_LAST_MESSAGE_SUCCESS:
      return {
        ...state,
        purchare: payload,
      };
    case BUSINESS_SET_PUSH_NOTIFICATION:
      return {
        ...state,
        push: payload,
      };
    case BUSINESS_SALES_LOADING:
      return {
        ...state,
        saleLoading: payload,
      };
    case BUSINESS_SALES_SUCCESS:
      return {
        ...state,
        sale: payload,
      };
    case BUSINESS_SALES_FAILURE:
      return {
        ...state,
        saleError: payload,
      };

    case BUSINESS_PURCHARES_LOADING:
      return {
        ...state,
        purchareLoading: payload,
      };
    case BUSINESS_PURCHARES_SUCCESS:
      return {
        ...state,
        purchare: payload,
      };
    case BUSINESS_PURCHARES_FAILURE:
      return {
        ...state,
        purchareError: payload,
      };

    case BUSINESS_SALES_BY_VEHICLE_LOADING:
      return {
        ...state,
        saleVehicleLoading: payload,
      };
    case BUSINESS_SALES_BY_VEHICLE_SUCCESS:
      return {
        ...state,
        saleVehicle: payload,
      };
    case BUSINESS_SALES_BY_VEHICLE_FAILURE:
      return {
        ...state,
        saleVehicleError: payload,
      };

    case BUSINESS_HISTORY_LOADING:
      return {
        ...state,
        historyLoading: payload,
      };
    case BUSINESS_HISTORY_SUCCESS:
      return {
        ...state,
        history: payload,
      };
    case BUSINESS_HISTORY_FAILURE:
      return {
        ...state,
        historyError: payload,
      };

    case BUSINESS_VEHICLE_LOADING:
      return {
        ...state,
        vehicleLoading: payload,
      };
    case BUSINESS_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicle: payload,
      };
    case BUSINESS_VEHICLE_FAILURE:
      return {
        ...state,
        vehicleError: payload,
      };
    case BUSINESS_VEHICLE_RESET:
      return {
        ...state,
        vehicle: INITIAL_STATE.vehicle,
        vehicleLoading: INITIAL_STATE.vehicleLoading,
        vehicleError: INITIAL_STATE.vehicleError,
      };

    case BUSINESS_SEND_CHAT_LOADING:
      return {
        ...state,
        chatLoading: payload,
      };
    case BUSINESS_SEND_CHAT_SUCCESS:
      return {
        ...state,
        chatData: payload,
      };
    case BUSINESS_SEND_CHAT_FAILURE:
      return {
        ...state,
        chatError: payload,
      };
    case BUSINESS_SEND_CHAT_RESET:
      return {
        ...state,
        chatLoading: INITIAL_STATE.chatLoading,
        chatError: INITIAL_STATE.chatError,
        chatData: INITIAL_STATE.chatData,
      };

    case BUSINESS_NOTIFICATIONS_GET_LOADING:
      return {
        ...state,
        initialLoading: payload,
      };
    case BUSINESS_NOTIFICATIONS_GET_SUCCESS:
      return {
        ...state,
        initialData: payload,
      };
    case BUSINESS_NOTIFICATIONS_GET_FAILURE:
      return {
        ...state,
        initialError: payload,
      };

    case BUSINESS_USER:
      return {
        ...state,
        user: payload,
      };
    case BUSINESS_UPDATE_BUYER_LAST_MESSAGE:
      return {
        ...state,
        saleVehicle: payload,
      };

    default:
      return state;
  }
};

export function updateLastMessage(payload) {
  return {
    type: UPDATE_LAST_MESSAGE,
    payload,
  };
}

export function setPushNotification(payload) {
  return {
    type: BUSINESS_SET_PUSH_NOTIFICATION,
    payload,
  };
}

export function getSale() {
  return {
    type: BUSINESS_SALES_REQUEST,
  };
}

export function getPurchare() {
  return {
    type: BUSINESS_PURCHARES_REQUEST,
  };
}

export function getSaleVehicle(data) {
  return {
    type: BUSINESS_SALES_BY_VEHICLE_REQUEST,
    payload: data,
  };
}

export function getHistory(data) {
  return {
    type: BUSINESS_HISTORY_REQUEST,
    payload: data,
  };
}

export function getVehicle(data) {
  return {
    type: BUSINESS_VEHICLE_REQUEST,
    payload: data,
  };
}

export function vehicleReset() {
  return {
    type: BUSINESS_VEHICLE_RESET,
  };
}

export function sendChat(data) {
  return {
    type: BUSINESS_SEND_CHAT_REQUEST,
    payload: data,
  };
}

export function resetSendChat() {
  return {
    type: BUSINESS_SEND_CHAT_RESET,
  };
}

export function getInitialNotifications() {
  return {
    type: BUSINESS_NOTIFICATIONS_GET_REQUEST,
  };
}

export function setUser(payload) {
  return {
    type: BUSINESS_USER,
    payload,
  };
}
export function updateBuyerLastMessage(payload) {
  return {
    type: BUSINESS_UPDATE_BUYER_LAST_MESSAGE,
    payload,
  };
}

function* getSaleSaga() {
  try {
    yield put({ type: BUSINESS_SALES_LOADING, payload: true });
    yield put({ type: BUSINESS_SALES_FAILURE, payload: false });
    const { data, status } = yield call(api.fetchSales);

    if (status === 200) {
      yield put({ type: BUSINESS_SALES_SUCCESS, payload: data.data });
    } else {
      yield put({ type: BUSINESS_SALES_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_SALES_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_SALES_LOADING, payload: false });
  }
}

function* getPurchareSaga() {
  try {
    yield put({ type: BUSINESS_PURCHARES_LOADING, payload: true });
    yield put({ type: BUSINESS_PURCHARES_FAILURE, payload: false });

    const { data, status } = yield call(api.fetchPurchases);

    if (status === 200) {
      yield put({ type: BUSINESS_PURCHARES_SUCCESS, payload: data?.data });
    } else {
      yield put({ type: BUSINESS_PURCHARES_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_PURCHARES_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_PURCHARES_LOADING, payload: false });
  }
}

function* getSaleVehicleSaga({ payload }) {
  try {
    yield put({ type: BUSINESS_SALES_BY_VEHICLE_LOADING, payload: true });
    yield put({ type: BUSINESS_SALES_BY_VEHICLE_FAILURE, payload: false });

    const { data, status } = yield call(api.fetchSalesByVehicles, payload);

    if (status === 200) {
      yield put({ type: BUSINESS_SALES_BY_VEHICLE_SUCCESS, payload: data.data });
    } else {
      yield put({ type: BUSINESS_SALES_BY_VEHICLE_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_SALES_BY_VEHICLE_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_SALES_BY_VEHICLE_LOADING, payload: false });
  }
}

function* getHistorySaga({ payload }) {
  try {
    yield put({ type: BUSINESS_HISTORY_LOADING, payload: true });
    yield put({ type: BUSINESS_HISTORY_FAILURE, payload: false });

    const { data, status } = yield call(api.fetchChatHistory, payload);

    if (status === 200) {
      yield put({ type: BUSINESS_HISTORY_SUCCESS, payload: data.data });
    } else {
      yield put({ type: BUSINESS_HISTORY_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_HISTORY_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_HISTORY_LOADING, payload: false });
  }
}

function* getVehicleSaga({ payload }) {
  try {
    yield put({ type: BUSINESS_VEHICLE_LOADING, payload: true });
    yield put({ type: BUSINESS_VEHICLE_FAILURE, payload: false });

    const { data, status } = yield call(api.getAdByVehicleId, payload);

    if (status === 200) {
      yield put({ type: BUSINESS_VEHICLE_SUCCESS, payload: data.data });
    } else {
      yield put({ type: BUSINESS_VEHICLE_FAILURE, payload: false });
    }
  } catch (e) {
    yield put({ type: BUSINESS_VEHICLE_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_VEHICLE_LOADING, payload: false });
  }
}

function* sendChatSaga({ payload }) {
  try {
    yield put({ type: BUSINESS_SEND_CHAT_LOADING, payload: true });
    yield put({ type: BUSINESS_SEND_CHAT_FAILURE, payload: false });
    const { data } = yield call(api.sendChatEvent, payload);

    const { saleVehicle } = yield select((state) => state.business);
    const index = saleVehicle?.findIndex((e) => e.id === payload?.to?.id);

    if (data.success || data.code) {
      // Update buyers last message
      if (index !== -1) {
        saleVehicle[index].last_event.event.text = payload.event.text;
        saleVehicle[index].last_event.created_at = moment(payload.created_at).format(
          'YYYY-MM-DD HH:mm:ss',
        );
        yield put({ type: BUSINESS_UPDATE_BUYER_LAST_MESSAGE, payload: saleVehicle });
      }
      yield put({ type: BUSINESS_SEND_CHAT_SUCCESS, payload: payload?.event?.text || true });
    } else {
      yield put({ type: BUSINESS_SEND_CHAT_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_SEND_CHAT_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_SEND_CHAT_LOADING, payload: false });
  }
}

function* getInitialNotificationsSaga() {
  try {
    yield put({ type: BUSINESS_NOTIFICATIONS_GET_LOADING, payload: true });
    yield put({ type: BUSINESS_NOTIFICATIONS_GET_FAILURE, payload: false });

    const { data } = yield call(api.fetchNotificationsHistory);

    if (data?.code === 'success') {
      yield put({ type: BUSINESS_NOTIFICATIONS_GET_SUCCESS, payload: data.data });
    } else {
      yield put({ type: BUSINESS_NOTIFICATIONS_GET_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: BUSINESS_NOTIFICATIONS_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: BUSINESS_NOTIFICATIONS_GET_LOADING, payload: false });
  }
}

function* updateLastMessageSaga({ payload: data }) {
  const { purchare } = yield select((state) => state.business);
  const find = purchare?.find((e) => e.vehicle_user_secure_id === data?.user?.secure_id);
  if (find) {
    find.last_event.event = data?.event;
    find.last_event.timestamp = data?.timestamp;
    find.last_event.created_at = moment.unix(data?.timestamp).format('YYYY-MM-DD HH:mm:ss');
  }
  yield put({ type: UPDATE_LAST_MESSAGE_SUCCESS, payload: purchare });
}

function* watchGetSale() {
  yield takeLatest(BUSINESS_SALES_REQUEST, getSaleSaga);
}

function* watchGetPurchare() {
  yield takeLatest(BUSINESS_PURCHARES_REQUEST, getPurchareSaga);
}

function* watchGetSaleVehicle() {
  yield takeLatest(BUSINESS_SALES_BY_VEHICLE_REQUEST, getSaleVehicleSaga);
}

function* watchGetHistory() {
  yield takeLatest(BUSINESS_HISTORY_REQUEST, getHistorySaga);
}

function* watchGetVehicle() {
  yield takeLatest(BUSINESS_VEHICLE_REQUEST, getVehicleSaga);
}

function* watchSendChat() {
  yield takeLatest(BUSINESS_SEND_CHAT_REQUEST, sendChatSaga);
}

function* watchGetInitialNotifications() {
  yield takeLatest(BUSINESS_NOTIFICATIONS_GET_REQUEST, getInitialNotificationsSaga);
}

function* watchUpdateLastMessage() {
  yield takeLatest(UPDATE_LAST_MESSAGE, updateLastMessageSaga);
}

export const businessSagas = [
  fork(watchGetSale),
  fork(watchGetPurchare),
  fork(watchGetSaleVehicle),
  fork(watchGetHistory),
  fork(watchGetVehicle),
  fork(watchSendChat),
  fork(watchGetInitialNotifications),
  fork(watchUpdateLastMessage),
];
