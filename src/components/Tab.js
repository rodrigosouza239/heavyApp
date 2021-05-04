import Typography from '@components/Typography';
import { useTheme } from '@theme';
import React from 'react';
import { Dimensions } from 'react-native';
import { TabBar } from 'react-native-tab-view';

const { width: viewportWidth } = Dimensions.get('window');

function Tab(props) {
  const theme = useTheme();

  const {
    palette: { action, primary, common },
    spacing,
    tabBar: { height },
  } = theme;

  return (
    <TabBar
      pressOpacity={0.8}
      renderIndicator={() => null}
      style={{ backgroundColor: common.white, height, elevation: 1 }}
      tabStyle={{ width: 'auto', paddingHorizontal: spacing(2) }}
      renderLabel={({ route, focused }) => (
        <Typography
          fontWeight="bold"
          style={{ color: focused ? primary.main : action.disabled }}
          variant={viewportWidth > 320 ? 'h1' : 'h2'}
        >
          {route.title}
        </Typography>
      )}
      {...props}
    />
  );
}

export default Tab;
