import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { closeExportModal } from 'Actions';

class ExportModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.closeExportModal}
      />,
    ];

    return (
      <Dialog
        title="Export Reports"
        actions={actions}
        modal
        open={this.props.exportModalOpen}
      >
        <TextField
          floatingLabelText="Export"
          floatingLabelFixed
          multiLine
          style={{ width: '100%', overflow: 'scroll' }}
          textareaStyle={{ width: '100%', fontSize: '.8em' }}
          type="text"
          value={JSON.stringify(this.props.reports.toJSON())}
          required
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

ExportModal.propTypes = {
  closeExportModal: PropTypes.func.isRequired,
  exportModalOpen: PropTypes.bool.isRequired,
  reports: ImmutablePropTypes.orderedMap.isRequired,
};

const mapStateToProps = state => ({
  reports: state.get('Reports'),
  exportModalOpen: state.getIn(['App', 'exportModalOpen']),
});

const mapDispatchToProps = dispatch => bindActionCreators({ closeExportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExportModal);

