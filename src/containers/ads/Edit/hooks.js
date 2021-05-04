export function useDynamicSubtitles(ad, $t) {
  const productDynamicItems = {
    has_motorhours: $t('engineHours'),
    has_trackhours: $t('trackHours'),
    has_mileage: $t('mileage'),
  };

  const overviewProductItems = {
    has_platform: $t('platform'),
  };

  const getDynamicSubtitle = (dynamicData) => {
    const productItems = Object.keys(dynamicData).filter((item) => !!ad[item]);
    return productItems.map((item) => dynamicData[item]).join(', ');
  };

  return {
    overview: getDynamicSubtitle(overviewProductItems),
    product: getDynamicSubtitle(productDynamicItems),
  };
}

export function useEditAdItems(ad, $t) {
  return [
    {
      title: $t('dataProduct'),
      subtitle: `${$t('product')}, ${$t('brand')}, ${$t('model')}, ${
        useDynamicSubtitles(ad, $t).overview ? `${useDynamicSubtitles(ad, $t).overview},` : ''
      } ${$t('yearManufacture')}, ${$t('country')}, ${$t('state')} ${$t('and')} ${$t('city')}`,
      screen: 'ads-overview',
    },
    {
      title: $t('moreProductInformation'),
      subtitle: `${$t('description')}, ${useDynamicSubtitles(ad, $t).product} ${$t('and')} ${$t(
        'price',
      )}`,
      screen: 'ads-more-infos',
    },
    {
      title: $t('options'),
      subtitle: $t('optionalItems'),
      screen: 'ads-optionals',
    },
    {
      title: $t('features'),
      subtitle: $t('extraInformation'),
      screen: 'ads-extras',
    },
    {
      title: $t('images'),
      subtitle: $t('editYourProductImages'),
      screen: 'ads-photos',
    },
  ];
}
