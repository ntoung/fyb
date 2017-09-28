import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List } from 'material-ui/List';
import { setView, setBudget } from 'Actions';

class GraphInfo extends Component {
  constructor(props) {
    super(props);

    this.handleChangeView = this.handleChangeView.bind(this);
    this.setBudget = this.setBudget.bind(this);
  }

  setBudget(e) {
    const budget = e.target.value;
    this.props.setBudget(this.props.reportId, +budget);
  }

  handleChangeView(event, index, val) {
    this.props.setView(this.props.reportId, val);
  }

  render() {
    let total = 0;
    let inputs = 0;
    this.props.inputs.forEach((input) => {
      total += (input.get('inputCost')) ? input.get('inputCost') * input.get('inputFrequency') : 0;
      inputs += 1;
    });

    const deficit = (this.props.budget - total).toFixed(2);

    return (
      <div>
        <Subheader>General Information</Subheader>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <List>
            <SelectField
              style={{
                width: '120px',
                verticalAlign: 'top',
                margin: '0 12px',
              }}
              floatingLabelText="View"
              floatingLabelFixed
              name="view"
              value={this.props.view}
              onChange={this.handleChangeView}
              defaultValue={1}
            >
              <MenuItem value={1} primaryText="Graph" />
              <MenuItem value={2} primaryText="Table" />
            </SelectField>
            <TextField
              style={{
                width: '80px',
                verticalAlign: 'top',
                margin: '0 12px',
              }}
              hintText="$0.00"
              floatingLabelText="Budget"
              floatingLabelFixed
              type="number"
              name="budget"
              defaultValue={this.props.budget}
              onChange={this.setBudget}
            />
            <TextField
              style={{
                width: '80px',
                verticalAlign: 'top',
                margin: '0 12px',
                cursor: 'default',
              }}
              hintText="$0.00"
              floatingLabelText={(deficit < 0) ? 'Deficit' : 'Surplus'}
              floatingLabelFixed
              disabled
              value={deficit}
            />
          </List>
        </div>
      </div>
    );
  }
}

GraphInfo.propTypes = {
  view: PropTypes.number.isRequired,
  inputs: ImmutablePropTypes.list.isRequired,
  budget: PropTypes.number.isRequired,
  setView: PropTypes.func.isRequired,
  setBudget: PropTypes.func.isRequired,
  reportId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  view: state.getIn(['Reports', props.reportId, 'view']),
  inputs: state.getIn(['Reports', props.reportId, 'inputs']),
  budget: state.getIn(['Reports', props.reportId, 'budget']),
});

const mapDispatchToProps = dispatch => bindActionCreators({ setView, setBudget }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphInfo);
