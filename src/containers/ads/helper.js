import { formatCurrency } from '@utils/';
import moment from 'moment';

export const formatDate = (date) => {
  if (date) {
    const momentDate = moment(date, 'YYYY-MM-DD HH:mm:ss', true);

    if (momentDate.isValid()) {
      return momentDate.format('DD/MM/YYYY');
    }
  }

  return '';
};

function getImage(images, single = true) {
  let normalizedImages = single ? '' : [];

  if (typeof images === 'object') {
    normalizedImages = Object.values(images);

    if (single) {
      return { uri: normalizedImages[0]?.image?.original };
    }

    return normalizedImages.map((item) => ({ uri: item?.image?.original, id: item?.id }));
  }

  return normalizedImages;
}

function getExtras(extras, attribute = 'description') {
  if (typeof extras === 'object') {
    return Object.values(extras).map(({ extra }) => extra[attribute]) ?? [];
  }

  return [];
}

function getOptionals(optionals, attribute = 'description') {
  if (typeof optionals === 'object') {
    return Object.values(optionals).map(({ optional }) => optional[attribute]) ?? [];
  }

  return [];
}

export const normalizeAd = (ad) => {
  const brand = ad?.brand?.description ?? '';
  const createdAt = formatDate(ad?.created_at);
  const expiresIn = formatDate(ad?.current_payment?.expiration_date);
  const id = ad?.id;
  const image = getImage(ad?.vehicle_image);
  const model = ad?.model?.description ?? '';
  const price = formatCurrency(ad?.price) ?? '';
  const status = ad?.status ?? '';

  return {
    brand,
    createdAt,
    expiresIn,
    id,
    image,
    model,
    price,
    status,
  };
};

export const normalizeAdDetail = (ad, singleImage = false) => {
  const id = ad?.id ?? '';
  const brand = ad?.brand?.description ?? '';
  const description = ad?.description ?? '';
  const extras = getExtras(ad?.vehicle_extra);
  const fabricationYear = ad?.fabrication_year ?? '';
  const images = getImage(ad?.vehicle_image, singleImage);
  const mileAge = ad?.mileage ?? '';
  const model = ad?.model?.description ?? '';
  const motorHours = ad?.motorhours ?? '';
  const optionals = getOptionals(ad?.vehicle_optional);
  const price = formatCurrency(ad?.price) ?? '';
  const product = ad?.product?.description ?? '';
  const status = ad?.status ?? '';
  const trackHours = ad?.trackhours ?? '';

  return {
    id,
    brand,
    extras,
    fabricationYear,
    images,
    mileAge,
    model,
    motorHours,
    optionals,
    price,
    product,
    trackHours,
    description,
    status,
  };
};

export const normalizeAdEdit = (ad) => {
  const brand_id = ad?.brand?.id ?? '';
  const city_id = ad?.city?.id ?? '';
  const country_id = ad?.city?.state?.country_id ?? '';
  const description = ad?.description ?? '';
  const extras = getExtras(ad?.vehicle_extra, 'id');
  const fabrication_year = ad?.fabrication_year ?? '';
  const has_mileage = ad?.product?.has_mileage ?? false;
  const has_motorhours = ad?.product?.has_motorhours ?? false;
  const has_platform = ad?.product?.has_platform ?? false;
  const has_trackhours = ad?.product?.has_trackhours ?? false;
  const id = ad?.id ?? '';
  const mileage = ad?.mileage ?? '';
  const model_id = ad?.model?.id ?? '';
  const motorhours = ad?.motorhours ?? '';
  const optionals = getOptionals(ad?.vehicle_optional, 'id');
  const platform_id = ad?.platform?.id ?? '';
  const price = ad?.price ?? '';
  const product_id = ad?.product?.id ?? '';
  const state_id = ad?.city?.state_id ?? '';
  const trackhours = ad?.trackhours ?? '';
  const images = getImage(ad?.vehicle_image, false);

  return {
    brand_id,
    city_id,
    country_id,
    description,
    extras,
    fabrication_year,
    has_mileage,
    has_motorhours,
    has_platform,
    has_trackhours,
    id,
    images,
    mileage,
    model_id,
    motorhours,
    optionals,
    platform_id,
    price,
    product_id,
    state_id,
    trackhours,
  };
};

export const normalizeAdModality = (ad) => {
  const brand = ad?.brand?.description ?? '';
  const city = ad?.city?.description ?? '';
  const createdAt = formatDate(ad?.created_at) ?? '';
  const expiresIn = formatDate(ad?.current_payment?.expiration_date) ?? '';
  const images = getImage(ad?.vehicle_image, false);
  const model = ad?.model?.description ?? '';
  const planName = ad?.current_payment?.plan_name ?? '';
  const planPrice = formatCurrency(ad?.current_payment?.plan_price) ?? '';
  const price = formatCurrency(ad?.price) ?? '';
  const product = ad?.product?.description ?? '';
  const state = ad?.city?.state?.initials ?? '';

  return {
    brand,
    city,
    createdAt,
    expiresIn,
    images,
    model,
    planName,
    planPrice,
    price,
    product,
    state,
  };
};
