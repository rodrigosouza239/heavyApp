import { apiPrivate } from '@api';

export function fetchSales() {
  return apiPrivate.post('/user_chat_event/action/AppSells');
}

export function fetchPurchases() {
  return apiPrivate.post('/user_chat_event/action/AppPurchases');
}

export function fetchSalesByVehicles(vehicleId) {
  return apiPrivate.post('/user_chat_event/action/AppSellsByVehicle', {
    vehicle_id: vehicleId,
  });
}

export function fetchChatHistory(params) {
  return apiPrivate.post('/user_chat_event/action/FetchChatHistory', {
    ...params,
  });
}

export function sendChatEvent(params) {
  return apiPrivate.post('/user_chat_event/action/SendChatEvent', {
    ...params,
  });
}

export function getAdByVehicleId(vehicleId) {
  return apiPrivate.post(`user/action/MyVehiclesDetails`, { vehicle_id: vehicleId });
}

export function fetchNotificationsHistory() {
  return apiPrivate.post(`user_chat_event/action/FetchNotificationsHistory`);
}
