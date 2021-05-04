import { formatCurrency } from '@utils/';

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

function getLocation(city, state, country) {
  return [city, state, country].filter(Boolean).join(', ');
}

export const normalizeAdDetail = (ad, singleImage = false) => {
  const brand = ad?.brand?.description ?? '';
  const description = ad?.description ?? '';
  const extras = getExtras(ad?.vehicle_extra);
  const fabricationYear = ad?.fabrication_year ?? '';
  const id = ad?.id ?? '';
  const images = getImage(ad?.vehicle_image, singleImage);
  const mileAge = ad?.mileage ?? '';
  const model = ad?.model?.description ?? '';
  const motorHours = ad?.motorhours ?? '';
  const optionals = getOptionals(ad?.vehicle_optional);
  const price = formatCurrency(ad?.price) ?? '';
  const product = ad?.product?.description ?? '';
  const status = ad?.status ?? '';
  const trackHours = ad?.trackhours ?? '';
  const userCity = ad?.user?.user_info?.city ?? '';
  const userCountry = ad?.user?.user_info?.country?.description ?? '';
  const userName = ad?.user?.name ?? '';
  const userPhone = ad?.user?.user_info?.phone ?? '';
  const userPhoneWhats = ad?.user?.user_info?.phone_is_whatsapp ?? false;
  const userState = ad?.user?.user_info?.state ?? '';
  const city = ad?.city ?? '';

  return {
    brand,
    description,
    extras,
    fabricationYear,
    id,
    images,
    mileAge,
    model,
    motorHours,
    optionals,
    price,
    product,
    status,
    trackHours,
    city,
    user: {
      location: getLocation(userCity, userState, userCountry),
      name: userName,
      phone: userPhone,
      userPhoneWhats,
    },
  };
};

export default normalizeAdDetail;
