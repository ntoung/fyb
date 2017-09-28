import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { addGraphInput } from 'Actions';
import Input from './Input';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.handleAddInput = this.handleAddInput.bind(this);
  }

  handleAddInput() {
    this.props.addGraphInput(this.props.reportId);
  }

  render() {
    return (
      <div>
        <span>
          <div className="inputButtonGroup buttonGroup">
            <RaisedButton
              label="Add Input"
              onClick={this.handleAddInput}
              style={{ margin: 12, float: 'right' }}
            />
          </div>
        </span>
        <Subheader
          style={{
            display: 'inline-block',
            width: 40,
          }}
        >
          Inputs
        </Subheader>
        <div className="inputContainer">
          {
            this.props.inputs.map((input, index) =>
              (<Input
                reportId={this.props.reportId}
                key={input.get('inputId')}
                index={index}
                inputId={input.get('inputId')}
                inputName={input.get('inputName')}
                inputCost={input.get('inputCost')}
                inputFrequency={input.get('inputFrequency')}
                inputSerialNumber={input.get('inputSerialNumber')}
              />),
            )
          }
        </div>
      </div>
    );
  }
}

Inputs.propTypes = {
  inputs: ImmutablePropTypes.list.isRequired,
  addGraphInput: PropTypes.func.isRequired,
  reportId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  inputs: state.getIn(['Reports', props.reportId, 'inputs']),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addGraphInput,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
