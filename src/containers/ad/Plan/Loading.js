import Box from '@components/Box';
import Card from '@components/Card';
import Container from '@components/Container';
import Shimmer from '@components/Shimmer';
import { useTheme } from '@theme/';
import color from 'color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    height: 24,
    marginVertical: 8,
    width: '70%',
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 28,
    height: 56,
    width: 56,
  },
  description: {
    alignSelf: 'center',
    height: 16,
    width: '50%',
  },
  price: {
    alignSelf: 'center',
    height: 16,
    marginVertical: 8,
    width: '30%',
  },
});

function Loading() {
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

  return (
    <View style={styles.root}>
      <Shimmer>
        <View style={headerStyles} />
      </Shimmer>
      <Card containerProps={{ px: 0 }}>
        <Container>
          <Shimmer>
            <View style={styles.title} />
          </Shimmer>
        </Container>
        <Container
          style={[
            {
              backgroundColor: color(divider).alpha(0.05).rgb().toString(),
            },
          ]}
        >
          <Box mb={2}>
            <Shimmer>
              <View style={styles.circle} />
            </Shimmer>
          </Box>
          <Shimmer>
            <View style={styles.description} />
          </Shimmer>
        </Container>
        <Container>
          <Shimmer>
            <View style={styles.price} />
          </Shimmer>
        </Container>
      </Card>
      <Shimmer>
        <View style={footerStyles} />
      </Shimmer>
    </View>
  );
}

export default Loading;
