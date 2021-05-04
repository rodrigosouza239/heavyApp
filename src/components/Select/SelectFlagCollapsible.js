import ListItem from '@components/ListItem';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Flag from '@components/Flag';
import { Keyboard, StyleSheet, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: '',
    content: '',
  },
];

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  iconHolder: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});

const SelectCollapsible = React.forwardRef(({ onChange, options, value }) => {
  const [activeSections, setActiveSections] = useState([]);

  // TODO: remove this line after upgrade react-native-collapsible
  /* eslint-disable-next-line */

  const {
    input: { borderColor, height },
    shape: { borderRadius },
  } = useTheme();

  const getSelectedLabel = () => {
    const selectedItem = options.find((option) => option.value === value);

    return selectedItem ? selectedItem.value : 'br';
  };

  const close = () => {
    setActiveSections([]);
  };

  const closeKeyboard = () => Keyboard.dismiss();

  const handleChange = (selectedValue) => {
    close();

    if (onChange) {
      onChange(selectedValue);
    }
  };

  const renderHeader = () => {
    return (
      <View style={[styles.root, { height }]}>
        <Flag country={getSelectedLabel()} />
      </View>
    );
  };

  const renderContent = () => {
    if (Array.isArray(options)) {
      return options.map(
        (option) =>
          option.value !== value && (
            <ListItem
              style={{ alignItems: 'center' }}
              onPress={handleChange}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </ListItem>
          ),
      );
    }

    return null;
  };

  const updateSections = (sections) => setActiveSections(sections);

  return (
    <Accordion
      activeSections={activeSections}
      onChange={updateSections}
      renderContent={renderContent}
      renderHeader={renderHeader}
      sectionContainerStyle={{ borderColor, borderRadius }}
      sections={SECTIONS}
      underlayColor="transparent"
      onAnimationEnd={closeKeyboard}
    />
  );
});

SelectCollapsible.defaultProps = {
  onChange: null,
  options: null,
  value: null,
};

SelectCollapsible.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.node,
    }),
  ),
};

export default SelectCollapsible;
