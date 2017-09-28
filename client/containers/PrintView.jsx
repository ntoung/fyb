import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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

const PrintView = props => (
  <div className="printContainer">
    {
      props.printList.map((reportId) => {
        const report = props.reports.get(reportId);
        const inputs = report.get('inputs');
        const budget = report.get('budget');

        let totalExpenses = 0;

        return (
          <div
            key={reportId}
          >
            <h1>{report.get('name')}</h1>

            <h3 style={{ textTransform: 'uppercase' }}>Expenses</h3>

            <Table
              fixedHeader
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn><h4>Name</h4></TableHeaderColumn>
                  <TableHeaderColumn><h4>Total Cost</h4></TableHeaderColumn>
                  <TableHeaderColumn><h4>Percent of Budget</h4></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                {
                  inputs.map((input) => {
                    const name = input.get('inputName');
                    const totalCost = input.get('inputCost') * input.get('inputFrequency') || 0;
                    totalExpenses += totalCost;
                    const percentOfBudget = ((totalCost / budget) * 100).toFixed(2) || 0;

                    return (
                      <TableRow key={input.get('inputId')}>
                        <TableRowColumn>{name}</TableRowColumn>
                        <TableRowColumn>${totalCost}</TableRowColumn>
                        <TableRowColumn>{percentOfBudget}</TableRowColumn>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
            <h3 style={{ textTransform: 'uppercase' }}>Summary</h3>
            <Table
              fixedHeader
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn><h4>Total Expenses</h4></TableHeaderColumn>
                  <TableHeaderColumn><h4>Net Surplus (Deficit)</h4></TableHeaderColumn>
                  <TableHeaderColumn>
                    <h4>Percent {((budget - totalExpenses) < 0) ? 'Over' : 'Under'} Budget</h4>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                <TableRow key={report.get('id')}>
                  <TableRowColumn>${totalExpenses}</TableRowColumn>
                  <TableRowColumn>${budget - totalExpenses}</TableRowColumn>
                  <TableRowColumn>{((totalExpenses / budget) * 100).toFixed(2) || 0}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      })
    }
  </div>
);

PrintView.propTypes = {
  reports: ImmutablePropTypes.orderedMap.isRequired,
  printList: ImmutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({
  reports: state.get('Reports').reverse(),
  printList: state.getIn(['Print', 'PrintList']),
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrintView);
