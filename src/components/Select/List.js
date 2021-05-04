import CheckBox from '@components/CheckBox';
import Container from '@components/Container';
import ListItem from '@components/ListItem';
import TextInput from '@components/TextInput';
import Typography from '@components/Typography';
import { withTheme } from '@theme/';
import { removeAccents } from '@utils/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { withTranslation } from '@i18n/';

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});

class List extends Component {
  constructor() {
    super();

    this.state = {
      filterText: '',
    };
  }

  keyExtractor = (item) => {
    const { valueKey } = this.props;

    return `${item[valueKey]}`;
  };

  renderItem = ({ item }) => {
    const {
      labelKey,
      isMultiple,
      selectedValues,
      valueKey,
      theme: { spacing },
    } = this.props;

    let isChecked = false;

    if (Array.isArray(selectedValues)) {
      isChecked = selectedValues.find(
        (selectedValue) => `${item[valueKey]}` === `${selectedValue}`,
      );
    }

    return (
      <ListItem value={item} onPress={this.handlePressItem} size="medium">
        <View style={[styles.item, styles.flex]}>
          <View style={styles.flex}>
            <Typography color="textPrimary">{item[labelKey]}</Typography>
          </View>
          {isMultiple && (
            <View style={{ width: spacing(3) }}>
              <CheckBox
                value={item}
                onPress={this.handlePressItem}
                checked={isChecked !== undefined}
              />
            </View>
          )}
        </View>
      </ListItem>
    );
  };

  handlePressItem = (item) => {
    const { onSelectItem } = this.props;

    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  renderHeader = () => {
    const { filterText } = this.state;

    return (
      <Container>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          icon="search"
          value={filterText}
          onChangeText={this.handleChangeText}
        />
      </Container>
    );
  };

  handleChangeText = (value) => {
    this.setState({ filterText: value });
  };

  renderEmptyComponent = () => {
    const { $t } = this.props;
    return <Typography align="center">{$t('noItemsToDisplay')}</Typography>;
  };

  render() {
    const { options, labelKey, selectedValues } = this.props;
    const { filterText } = this.state;

    const filterRegex = new RegExp(String(removeAccents(filterText)), 'i');
    const filter = (item) => filterRegex.test(removeAccents(item[labelKey]));
    const filteredData = options.filter(filter);

    return (
      <View style={styles.flex}>
        <FlatList
          extraData={selectedValues}
          contentContainerStyle={{ flexGrow: 1 }}
          data={filteredData}
          initialNumToRender={20}
          keyboardShouldPersistTaps="handled"
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          removeClippedSubviews
          ListEmptyComponent={this.renderEmptyComponent}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]}
          windowSize={20}
        />
        <SafeAreaConsumer>
          {(insets) => <View style={{ paddingBottom: insets.bottom }} />}
        </SafeAreaConsumer>
      </View>
    );
  }
}

List.propTypes = {
  $t: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  labelKey: PropTypes.string.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  valueKey: PropTypes.string.isRequired,
};

export default withTheme(withTranslation(List));
