import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Description from '@components/Product/Description';
import Details from '@components/Product/Details';
import Extras from '@components/Product/Extras';
import Image from '@components/Product/Image';
import Optionals from '@components/Product/Optionals';
import Price from '@components/Product/Price';
import Title from '@components/Product/Title';
import { safeRender, safeRenderItems } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import { Image as NewImage, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/';
import Icon from '@components/Icon';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import Share from './Share';

function Product({ data, onPress, complete, isRow, handleSelected, selected, list }) {
  const $t = useTranslation();

  const details = {
    fabricationYear: data?.fabricationYear,
    mileAge: data?.mileAge,
    motorHours: data?.motorHours,
    product: data?.product,
    trackHours: data?.trackHours,
    location: data?.city,
  };

  const {
    palette: { common, purple },
    shape: { borderRadius },
  } = useTheme();

  const renderComplete = () => (
    <>
      {safeRenderItems(
        data?.optionals,
        <Box mt={4}>
          <Optionals data={data?.optionals} />
        </Box>,
      )}
      {safeRenderItems(
        data?.extras,
        <Box mt={4}>
          <Extras data={data?.extras} />
        </Box>,
      )}
      {safeRender(
        data?.description,
        <Box mt={4}>
          <Description data={data?.description} />
        </Box>,
      )}
    </>
  );

  const renderCheckbox = () => {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}
        onPress={() => handleSelected(data)}
      >
        <Box
          style={{
            zIndex: 1,
            flexDirection: 'row',
            backgroundColor: 'black',
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              justifyContent: 'center',
              alignItems: 'center',

              borderColor: '#909090',
              borderWidth: selected ? 0 : 2,
              borderRadius: 10,
              backgroundColor: selected ? purple.black : common.white,
            }}
            onPress={() => handleSelected(data)}
          >
            <Icon name="check" color={common.white} size={20} />
          </TouchableOpacity>
          {selected && (
            <Box
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <Typography color="white" fontWeight="bold">
                {$t('compare')}
              </Typography>
            </Box>
          )}
        </Box>
      </TouchableOpacity>
    );
  };

  if (isRow)
    return (
      <>
        <Card onPress={onPress} containerProps={{ pt: 0 }} style={{ flexDirection: 'row' }}>
          {list && renderCheckbox()}
          <NewImage
            source={data?.images}
            style={{
              width: '50%',
              height: '100%',
              borderBottomLeftRadius: borderRadius,
              borderTopLeftRadius: borderRadius,
            }}
          />
          <Container style={{ flex: 1 }}>
            <Box>
              <Typography color="textSecondary" variant="subtitle" fontWeight="bold">
                {data?.brand}
              </Typography>
              <Typography color="orange" variant="subtitle" fontWeight="bold">
                {data?.model}
              </Typography>
            </Box>
            <Box mt={2}>
              <Price>{data?.price}</Price>
            </Box>
            <Box mt={2}>
              <Details data={details} onlyIcons isRow={isRow} />
            </Box>
            {complete ? renderComplete() : null}
          </Container>
        </Card>
        {complete && <Share vehicleId={data?.id} />}
      </>
    );

  return (
    <>
      <Card onPress={onPress} containerProps={{ pt: 0 }}>
        {list && renderCheckbox()}
        <Image source={data?.images} />
        <Container>
          <Title prefix={data?.brand} suffix={data?.model} />
          {safeRender(
            data?.price,
            <Box mt={2}>
              <Price>{data?.price}</Price>
            </Box>,
          )}
          <Box mt={2}>
            <Details data={details} isRow={isRow} />
          </Box>
          {complete ? renderComplete() : null}
        </Container>
      </Card>
      {complete && <Share vehicleId={data?.id} />}
    </>
  );
}

Product.defaultProps = {
  complete: false,
  data: null,
  onPress: null,
  isRow: null,
  handleSelected: null,
  selected: false,
  list: null,
};

Product.propTypes = {
  complete: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    brand: PropTypes.string,
    description: PropTypes.string,
    extras: PropTypes.array,
    fabricationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    images: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
      PropTypes.shape({ uri: PropTypes.string }),
    ]),
    mileAge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    model: PropTypes.string,
    motorHours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    optionals: PropTypes.array,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    product: PropTypes.string,
    status: PropTypes.string,
    trackHours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    city: PropTypes.object,
  }),
  onPress: PropTypes.func,
  isRow: PropTypes.bool,
  handleSelected: PropTypes.func,
  selected: PropTypes.bool,
  list: PropTypes.bool,
};

export default React.memo(Product);
