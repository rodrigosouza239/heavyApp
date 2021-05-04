import Button from '@components/Button';
import { iconNames } from '@components/Icon';
import TextInputAsButton from '@components/TextInput/TextInputAsButton';
import { withTranslation } from '@i18n/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import List from './List';
import ModalHeader from './ModalHeader';

class SelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      selectedValues: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { value } = nextProps;
    let selectedValues = [];

    if (value) {
      selectedValues = Array.isArray(value) ? value : [value];
    }

    return {
      selectedValues,
    };
  }

  toggleModalVisible = () => {
    const { disabled } = this.props;
    return !disabled && this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  handleSelectItem = (item) => {
    const { isMultiple } = this.props;

    if (isMultiple) {
      this.handleMultipleValue(item);
    } else {
      this.handleSingleValue(item);
    }
  };

  handleSingleValue = (item) => {
    const { valueKey, onChange } = this.props;

    if (onChange) {
      this.setState({ selectedValues: [item[valueKey]] }, () => {
        onChange(item[valueKey], item);
        window.setTimeout(this.toggleModalVisible, 185);
      });
    }
  };

  handleMultipleValue = (item) => {
    const { valueKey, onChange } = this.props;
    const { selectedValues: values } = this.state;
    const index = values.findIndex((selectedValue) => `${selectedValue}` === `${item[valueKey]}`);

    const { selectedValues } = this.state;

    const newSelectedValues =
      index === -1
        ? [...selectedValues, item[valueKey]]
        : selectedValues.filter((v, i) => i !== index);

    if (onChange) {
      onChange(newSelectedValues);
    }

    this.setState({ selectedValues: newSelectedValues });
  };

  renderValues = () => {
    const { options, valueKey, labelKey } = this.props;
    const { selectedValues } = this.state;

    return options
      .filter((option) =>
        selectedValues.find((selectedValue) => `${option[valueKey]}` === `${selectedValue}`),
      )
      .map((item) => item[labelKey])
      .join(', ');
  };

  render() {
    const { modalVisible, selectedValues } = this.state;

    const {
      disabled,
      endAdornment,
      icon,
      isMultiple,
      label,
      labelKey,
      loading,
      options,
      valueKey,
      title,
      $t,
    } = this.props;

    return (
      <TouchableOpacity onPress={this.toggleModalVisible}>
        <TextInputAsButton
          disabled={disabled || loading}
          endAdornment={endAdornment}
          icon={icon}
          label={loading ? $t('loading') : label}
          onPress={this.toggleModalVisible}
          value={this.renderValues()}
        />
        <Modal
          animationType="slide"
          onDismiss={this.handleDismiss}
          onRequestClose={this.toggleModalVisible}
          onShow={this.handleShow}
          visible={modalVisible}
        >
          <ModalHeader screenName={title} onPress={this.toggleModalVisible} />
          <List
            isMultiple={isMultiple}
            labelKey={labelKey}
            onSelectItem={this.handleSelectItem}
            options={options}
            selectedValues={selectedValues}
            valueKey={valueKey}
          />
          <View style={{ padding: 20 }}>
            <Button onPress={this.toggleModalVisible}>{$t('ready')}</Button>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}

SelectModal.defaultProps = {
  disabled: false,
  endAdornment: null,
  icon: null,
  isMultiple: false,
  label: null,
  labelKey: 'label',
  loading: false,
  onChange: null,
  options: [],
  value: '',
  valueKey: 'value',
  title: '',
};

SelectModal.propTypes = {
  $t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  icon: PropTypes.oneOf(iconNames),
  isMultiple: PropTypes.bool,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  valueKey: PropTypes.string,
  title: PropTypes.string,
};

export default withTranslation(SelectModal);
