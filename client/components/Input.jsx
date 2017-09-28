import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { updateGraphInput, removeGraphInput } from 'Actions';

class Input extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event, index, val) {
    const key = event.target.name || 'inputFrequency';
    let value = event.target.value || val;
    if (event.target.type === 'number') {
      value = +value;
    }

    this.props.updateGraphInput(this.props.reportId, this.props.inputId, { key, value });
  }

  handleRemove() {
    this.props.removeGraphInput(this.props.reportId, this.props.inputId);
  }

  render() {
    return (
      <div className="">
        <TextField
          style={{
            verticalAlign: 'top',
            margin: '0 12px',
            // width: '200px',
          }}
          hintText="Engine oil"
          floatingLabelText={`Input #${this.props.index + 1}`}
          floatingLabelFixed
          name="inputName"
          onChange={this.handleChange}
          defaultValue={this.props.inputName}
        />
        <TextField
          style={{
            width: '80px',
            verticalAlign: 'top',
            margin: '0 12px',

          }}
          hintText="$0.00"
          floatingLabelText="Cost"
          floatingLabelFixed
          type="number"
          name="inputCost"
          onChange={this.handleChange}
          defaultValue={this.props.inputCost}
        />
        <SelectField
          style={{
            width: '120px',
            verticalAlign: 'top',
            margin: '0 12px',
          }}
          floatingLabelText="Frequency"
          floatingLabelFixed
          name="inputFrequency"
          value={this.props.inputFrequency}
          onChange={this.handleChange}
          defaultValue={1}
        >
          <MenuItem value={1} primaryText="One-Time" />
          <MenuItem value={365} primaryText="Daily" />
          <MenuItem value={52} primaryText="Weekly" />
          <MenuItem value={12} primaryText="Monthly" />
        </SelectField>
        <TextField
          style={{
            verticalAlign: 'top',
            margin: '0 12px',
            width: '120px',
          }}
          hintText="123456789"
          floatingLabelText="Serial Number"
          floatingLabelFixed
          name="inputSerialNumber"
          onChange={this.handleChange}
          value={this.props.inputSerialNumber}
        />
        <IconButton
          tooltip="Remove"
          style={{
            verticalAlign: 'top',
            marginTop: '25px',
          }}
          onClick={this.handleRemove}
        >
          <Clear />
        </IconButton>
      </div>
    );
  }
}

Input.defaultProps = {
  inputName: '',
  inputSerialNumber: undefined,
  inputCost: undefined,
};

Input.propTypes = {
  reportId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string,
  inputCost: PropTypes.number,
  inputSerialNumber: PropTypes.number,
  inputFrequency: PropTypes.number.isRequired,
  removeGraphInput: PropTypes.func.isRequired,
  updateGraphInput: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateGraphInput,
  removeGraphInput,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Input);
