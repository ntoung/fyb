import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { importReports, closeImportModal } from 'Actions';

class ImportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      importReports: '',
    };

    this.isDisabled = this.isDisabled.bind(this);
    this.handleImport = this.handleImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleImport() {
    this.props.importReports(this.state.importReports);
  }

  isDisabled() {
    return this.state.importReports === '';
  }

  handleChange(e) {
    const value = e.target.value;

    this.setState(Object.assign({}, this.state, { importReports: value }));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.closeImportModal}
      />,
      <FlatButton
        label="Import"
        primary
        disabled={this.isDisabled()}
        onTouchTap={this.handleImport}
      />,
    ];

    return (
      <Dialog
        title="Import Reports"
        actions={actions}
        modal
        open={this.props.importModalOpen}
      >
        <TextField
          floatingLabelText="Import"
          floatingLabelFixed
          multiLine
          style={{ width: '100%', overflow: 'scroll' }}
          textareaStyle={{ width: '100%', fontSize: '.8em' }}
          type="text"
          value={this.state.importReports}
          required
          name="importState"
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

ImportModal.propTypes = {
  importReports: PropTypes.func.isRequired,
  closeImportModal: PropTypes.func.isRequired,
  importModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  importModalOpen: state.getIn(['App', 'importModalOpen']),
});

const mapDispatchToProps = dispatch => bindActionCreators({ importReports, closeImportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);

