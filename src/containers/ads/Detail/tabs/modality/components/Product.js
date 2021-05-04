import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Accounting from '@components/Product/Accounting';
import Image from '@components/Product/Image';
import Resume from '@components/Product/Resume';
import Status from '@components/Product/Status';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function Product({ data }) {
  const accounting = {
    createdAt: data?.createdAt,
    expiresIn: data?.expiresIn,
    location: `${data?.city}, ${data?.state}`,
    price: data?.price,
  };

  const resume = {
    planName: data?.planName,
    planPrice: data?.planPrice,
  };

  return (
    <>
      <Card>
        <Image source={data?.images} />
        <Container>
          <Typography fontWeight="bold" color="textSecondary">
            {data?.product}
          </Typography>
          <Box mt={2}>
            <Typography>
              {data?.product} - {data?.model} - {data?.brand}
            </Typography>
          </Box>
        </Container>
      </Card>
      <Container>
        <Box>
          <Accounting data={accounting} />
        </Box>
        <Box mt={4}>
          <Resume data={resume} />
        </Box>
        <Box mt={4}>
          <Status />
        </Box>
      </Container>
    </>
  );
}

Product.defaultProps = {
  data: null,
};

Product.propTypes = {
  data: PropTypes.shape({
    brand: PropTypes.string,
    city: PropTypes.string,
    createdAt: PropTypes.string,
    expiresIn: PropTypes.string,
    images: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    model: PropTypes.string,
    planName: PropTypes.string,
    planPrice: PropTypes.string,
    price: PropTypes.string,
    product: PropTypes.string,
    state: PropTypes.string,
  }),
};

export default Product;
