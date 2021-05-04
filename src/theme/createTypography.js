const fonts = {
  regular: {
    fontFamily: 'avenir-regular',
  },
  medium: {
    fontFamily: 'avenir-medium',
  },
  bold: {
    fontFamily: 'avenir-bold',
  },
};

function buildVariant(fontSize = 14, lineHeight = 14, fontFamily = 'regular') {
  return {
    fontSize,
    lineHeight: fontSize * lineHeight,
    fontFamily: fonts[fontFamily].fontFamily,
  };
}

const variants = {
  h1: buildVariant(30, 1.2, 'bold'),
  h2: buildVariant(25, 1.2, 'bold'),
  h6: buildVariant(21, 1.5, 'bold'),
  subtitle: buildVariant(18, 1.2, 'bold'),
  body1: buildVariant(15, 1.5, 'regular'),
  body2: buildVariant(13, 1.5, 'regular'),
  button: buildVariant(15, 1.2, 'bold'),
  caption: buildVariant(11, 1.2, 'regular'),
};

export default function createTypography() {
  return {
    fonts,
    ...variants,
  };
}
