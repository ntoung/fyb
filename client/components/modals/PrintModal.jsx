/* global window */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import { setPrintList, closePrintModal } from 'Actions';

class PrintModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const initialState = {};
    nextProps.reports.keySeq().forEach((key) => {
      initialState[key] = false;
    });

    this.setState({ ...this.state, ...initialState });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(Object.assign({}, this.state, { [name]: value }));
  }

  isDisabled() {
    const reports = Object.keys(this.state);

    for (let i = 0; i < reports.length; i += 1) {
      if (this.state[reports[i]]) return false;
    }

    return true;
  }

  handlePrint() {
    const reports = Object.keys(this.state);
    const printList = [];

    for (let i = 0; i < reports.length; i += 1) {
      if (this.state[reports[i]]) {
        printList.push(reports[i]);
        // printList.push(this.props.reports.get(reports[i]));
      }
    }

    this.props.setPrintList(printList);
    this.props.closePrintModal();
    window.setTimeout(() => {
      window.print();
    }, 0);
  }


  updateCheck(e) {
    this.setState({ ...this.state,
      [e.target.value]: !this.state[e.target.value] });
  }


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.closePrintModal}
      />,
      <FlatButton
        label="Print"
        primary
        disabled={this.isDisabled()}
        onTouchTap={this.handlePrint}
      />,
    ];

    return (
      <Dialog
        title="Confirm Print"
        actions={actions}
        modal
        open={this.props.printModalOpen}
      >
        {
          this.props.reports.entrySeq().map(([reportId, report]) => (
            <Checkbox
              key={reportId}
              label={report.get('name')}
              value={reportId}
              checked={this.state[reportId]}
              onCheck={this.updateCheck}
              style={{ marginBottom: 16 }}
            />
          ))
        }
      </Dialog>
    );
  }
}

PrintModal.propTypes = {
  reports: ImmutablePropTypes.orderedMap.isRequired,
  setPrintList: PropTypes.func.isRequired,
  closePrintModal: PropTypes.func.isRequired,
  printModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  printModalOpen: state.getIn(['App', 'printModalOpen']),
  reports: state.get('Reports').reverse(),
});

const mapDispatchToProps = dispatch => bindActionCreators({ setPrintList, closePrintModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrintModal);

