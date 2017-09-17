import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { addReport, closeCreateReportModal } from 'Actions';

class CreateReportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      subtitle: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(Object.assign({}, this.state, { [name]: value }));
  }

  isDisabled() {
    return this.state.name === '';
  }

  handleCreate() {
    this.props.addReport(this.state.name, this.state.subtitle);
    this.props.closeCreateReportModal();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.closeCreateReportModal}
      />,
      <FlatButton
        label="Create"
        primary
        disabled={this.isDisabled()}
        onTouchTap={this.handleCreate}
      />,
    ];

    return (
      <Dialog
        title="Create Report"
        actions={actions}
        modal
        open={this.props.createReportModalOpen}
      >
        <TextField
          hintText="2017 Fiscal Budget"
          floatingLabelText="Report Name"
          floatingLabelFixed
          type="text"
          name="name"
          value={this.state.name}
          required
          onChange={this.handleChange}
        />
        <br />
        <TextField
          hintText="2017-2018"
          floatingLabelText="Details"
          floatingLabelFixed
          type="text"
          name="subtitle"
          value={this.state.subtitle}
          required
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

CreateReportModal.propTypes = {
  closeCreateReportModal: PropTypes.func.isRequired,
  addReport: PropTypes.func.isRequired,
  createReportModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  createReportModalOpen: state.getIn(['App', 'createReportModalOpen']),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addReport, closeCreateReportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportModal);

