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
import { setGraphType, setBudget } from 'Actions';

class GraphInfo extends Component {
  constructor(props) {
    super(props);

    this.handleChangeGraphType = this.handleChangeGraphType.bind(this);
    this.setBudget = this.setBudget.bind(this);
  }

  setBudget(e) {
    const budget = e.target.value;
    this.props.setBudget({ budget });
  }

  handleChangeGraphType(event, index, val) {
    this.props.setGraphType(val);
  }

  render() {
    let total = 0;
    let inputs = 0;
    this.props.inputs.forEach((input) => {
      total += (input.get('inputCost')) ? input.get('inputCost') : 0;
      inputs += 1;
    });

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
              floatingLabelText="Graph Type"
              floatingLabelFixed
              disabled
              name="inputFrequency"
              value={this.props.graphType}
              onChange={this.handleChangeGraphType}
              defaultValue={1}
            >
              <MenuItem value={1} primaryText="Pie" />
              <MenuItem value={2} primaryText="Line" />
            </SelectField>
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
              onChange={this.setBudget}
            />
          </List>
        </div>
      </div>
    );
  }
}

GraphInfo.propTypes = {
  graphType: PropTypes.number.isRequired,
  inputs: ImmutablePropTypes.list.isRequired,
  budget: PropTypes.number.isRequired,
  setGraphType: PropTypes.func.isRequired,
  setBudget: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  graphType: state.getIn(['Reports', props.reportId, 'graphType']),
  inputs: state.getIn(['Reports', props.reportId, 'inputs']),
  budget: state.getIn(['Reports', props.reportId, 'budget']),
});

const mapDispatchToProps = dispatch => bindActionCreators({ setGraphType, setBudget }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphInfo);
