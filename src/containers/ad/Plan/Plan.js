import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Icon from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import color from 'color';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from '@utils/';
import PropTypes from 'prop-types';
import useTranslation from '@i18n/';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    display: 'flex',
  },
});

function Plan({ data, onPress }) {
  const $t = useTranslation();
  const { name, price, description } = data;

  const {
    palette: {
      secondary: { main },
      divider,
    },
    spacing,
  } = useTheme();

  const headerStyles = {
    backgroundColor: main,
    borderTopLeftRadius: spacing(),
    borderTopRightRadius: spacing(),
    height: spacing(3),
    marginHorizontal: spacing(2),
  };

  const footerStyles = {
    backgroundColor: main,
    borderBottomLeftRadius: spacing(),
    borderBottomRightRadius: spacing(),
    height: spacing(6),
    justifyContent: 'center',
    marginBottom: spacing(2),
    marginHorizontal: spacing(2),
  };

  const handlePress = () => onPress(data);

  return (
    <>
      <View style={headerStyles} />
      <Card containerProps={{ px: 0 }}>
        <Container>
          <Typography align="center" color="textSecondary" variant="h6">
            {`${name}`.toUpperCase()}
          </Typography>
        </Container>
        <Container
          style={[
            styles.content,
            {
              backgroundColor: color(divider).alpha(0.05).rgb().toString(),
            },
          ]}
        >
          <Box mb={2}>
            <Icon name="check-circle" size={56} />
          </Box>
          <Typography>{description}</Typography>
        </Container>
        <Container>
          <Typography align="center" color="textSecondary" variant="h6">
            {formatCurrency(price)}
          </Typography>
        </Container>
      </Card>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={footerStyles}>
          <Typography align="center" variant="h2" color="white">
            {$t('wantThis')}
          </Typography>
        </View>
      </TouchableOpacity>
    </>
  );
}

Plan.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Plan;
