import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Description from '@components/Product/Description';
import Details from '@components/Product/Details';
import Extras from '@components/Product/Extras';
import Image from '@components/Product/Image';
import Optionals from '@components/Product/Optionals';
import Price from '@components/Product/Price';
import Status from '@components/Product/Status';
import Title from '@components/Product/Title';
import { safeRender, safeRenderItems } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';

function Product({ data, renderFooter }) {
  const details = {
    fabricationYear: data?.fabricationYear,
    mileAge: data?.mileAge,
    motorHours: data?.motorHours,
    product: data?.product,
    trackHours: data?.trackHours,
  };

  return (
    <>
      <Card containerProps={{ pt: 0 }}>
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
            <Details data={details} />
          </Box>
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
          {safeRender(
            data?.status,
            <Box mt={4}>
              <Status status={data?.status} />
            </Box>,
          )}
          {renderFooter && renderFooter()}
        </Container>
      </Card>
    </>
  );
}

Product.defaultProps = {
  data: null,
  renderFooter: null,
};

Product.propTypes = {
  data: PropTypes.shape({
    brand: PropTypes.string,
    description: PropTypes.string,
    extras: PropTypes.array,
    fabricationYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    images: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    mileAge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    model: PropTypes.string,
    motorHours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    optionals: PropTypes.array,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    product: PropTypes.string,
    status: PropTypes.string,
    trackHours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  renderFooter: PropTypes.func,
};

export default Product;
