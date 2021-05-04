import { useTheme } from '@theme/';
import createSpacing from '@theme/createSpacing';
import currency from 'currency.js';
import { Dimensions, PixelRatio } from 'react-native';
import { MaskService } from 'react-native-masked-text';

export function generatePropSpacing(props) {
  const spacing = createSpacing();

  const mapSpacingToStyleName = {
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
  };

  const spaces = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'];
  const spaceProps = Object.keys(props).filter((prop) => spaces.indexOf(prop) !== -1);

  return spaceProps.reduce((styles, prop) => {
    styles.push({ [mapSpacingToStyleName[prop]]: props[prop] * spacing() });
    return styles;
  }, []);
}

export const removeAllNonNumeric = (value) =>
  typeof value === 'string' ? value.replace(/[^\d]/g, '') : value;

export const formatCurrency = (value) =>
  value
    ? currency(value, {
        formatWithSymbol: true,
        symbol: 'R$ ',
        decimal: ',',
        separator: '.',
      }).format()
    : '';

export const normalizePrice = (price) => {
  return String(price)
    .replace(/[R$\s|$\s]/gi, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');
};

export const useMaskedPrice = (price) => {
  return MaskService.toMask('money', price, {
    unit: 'R$ ',
    separator: ',',
    delimiter: '.',
  });
};

export const useVehicleStatus = (status) => {
  const {
    palette: { error, success, orange, purple },
  } = useTheme();

  const allStatus = {
    'waiting-payment': {
      description: 'Aguardando Pagamento',
      color: orange.main,
      status: 'waiting-payment',
    },
    'review-reproved': {
      description: 'Análise Reprovada',
      color: error.main,
      status: 'review-reproved',
    },
    archived: {
      description: 'Arquivado',
      color: purple.main,
      status: 'archived',
    },
    active: {
      description: 'Ativo',
      color: success.main,
      status: 'active',
    },
    'review-edited': {
      description: 'Em análise, novamente',
      color: orange.main,
      status: 'review-edited',
    },
    review: {
      description: 'Em análise',
      color: orange.main,
      status: 'review',
    },
    'payment-canceled': {
      description: 'Pagamento Cancelado',
      color: error.main,
      status: 'payment-canceled',
    },
    'payment-reproved': {
      description: 'Pagamento Reprovado',
      color: error.main,
      status: 'payment-reproved',
    },
    'suspended-admin': {
      description: 'Suspenso pela Heavy Motors',
      color: error.main,
      status: 'suspended-admin',
    },
    'suspended-user': {
      description: 'Suspenso pelo usuário',
      color: error.main,
      status: 'suspended-user',
    },
    expired: {
      description: 'Expirado',
      color: orange.main,
      status: 'expired',
    },
  };

  return allStatus[status] || allStatus;
};

export function safeRender(prop, component) {
  return prop !== undefined && `${prop}`.length > 0 ? component : null;
}

export function safeRenderItems(prop, component) {
  return Array.isArray(prop) && prop.length > 0 ? component : null;
}

export function getNameInitials(name) {
  if (!name) {
    return '';
  }

  const initials = name.split(' ').map((item) => item[0]);

  if (Array.isArray(initials)) {
    if (initials.length > 2) {
      return `${initials[0]}${initials[initials.length - 1]}`;
    }

    return initials.join('');
  }

  return initials;
}

export const removeAccents = (text) => {
  const latinMap = {
    â: 'a',
    Â: 'a',
    à: 'a',
    À: 'a',
    á: 'a',
    Á: 'a',
    ã: 'a',
    Ã: 'a',
    ê: 'e',
    Ê: 'e',
    è: 'e',
    È: 'e',
    é: 'e',
    É: 'e',
    î: 'i',
    Î: 'i',
    ì: 'i',
    Ì: 'i',
    í: 'i',
    Í: 'i',
    õ: 'o',
    Õ: 'o',
    ô: 'o',
    Ô: 'o',
    ò: 'o',
    Ò: 'o',
    ó: 'o',
    Ó: 'o',
    ü: 'u',
    Ü: 'u',
    û: 'u',
    Û: 'u',
    ú: 'u',
    Ú: 'u',
    ù: 'u',
    Ù: 'u',
    ç: 'c',
    Ç: 'c',
  };

  return typeof text === 'string' ? text.replace(/[^A-Za-z0-9]/g, (x) => latinMap[x] || x) : text;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const wpd = (widthPercent) => {
  return PixelRatio.roundToNearestPixel((screenWidth * parseFloat(widthPercent)) / 100);
};

export const hpd = (heightPercent) => {
  return PixelRatio.roundToNearestPixel((screenHeight * parseFloat(heightPercent)) / 100);
};

export const getBannerImages = [
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner2.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner3.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner4.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner5.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner6.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner7.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner8.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner9.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner10.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner11.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner12.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner13.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner14.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner15.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner16.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner17.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner18.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner19.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner20.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner21.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner22.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner23.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner24.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner25.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner26.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner27.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner28.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner29.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner30.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner31.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner32.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner33.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner34.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner35.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner36.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner37.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner38.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner39.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner40.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner41.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner42.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner43.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner44.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner45.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner46.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner47.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner48.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner49.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner50.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner51.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner52.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner53.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner54.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner55.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner56.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner57.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner58.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner59.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner60.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner61.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner62.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner63.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner64.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD2.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD3.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD4.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD5.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD6.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD7.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD8.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD9.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD10.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD11.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD12.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD13.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD14.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD15.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD16.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD17.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD18.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD19.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD20.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD21.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD22.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD23.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD24.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD25.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD26.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD27.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD28.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD29.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD30.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD31.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD32.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD33.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD34.jpg' },
  { uri: 'https://heavymotors.luby.com.br/img/banners/Banner-JD35.jpg' },
];

export function monetize(number) {
  if (number) {
    const newNumber = parseFloat(number)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return `R$ ${newNumber}`;
  }
  return 'R$';
}
