/* global Math */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table
          height={'800px'}
          fixedHeader
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Input Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Total Cost">Total Cost</TableHeaderColumn>
              <TableHeaderColumn tooltip="Percent of Budget">Percent of Budget</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.props.inputs.map((input) => {
                const name = input.get('inputName');
                const totalCost = input.get('inputCost') * input.get('inputFrequency') || 0;
                const percentOfBudget = ((totalCost / this.props.budget) * 100).toFixed(2) || 0;
                return (
                  <TableRow key={input.get('inputId')}>
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{totalCost}</TableRowColumn>
                    <TableRowColumn>{percentOfBudget}</TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = {
  inputs: ImmutablePropTypes.list.isRequired,
  budget: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  inputs: state.getIn(['Reports', props.reportId]).get('inputs'),
  budget: state.getIn(['Reports', props.reportId]).get('budget'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
