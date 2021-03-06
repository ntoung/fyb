import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Add from 'material-ui/svg-icons/content/add';
import Print from 'material-ui/svg-icons/action/print';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import { openPrintModal, openImportModal, openExportModal, openCreateReportModal } from 'Actions';

class AppToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild />
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            label="Print"
            labelPosition="before"
            icon={<Print />}
            style={{ margin: 12 }}
            onClick={this.props.openPrintModal}
          />
          <RaisedButton
            label="Export"
            labelPosition="before"
            icon={<FileUpload />}
            onClick={this.props.openExportModal}
            style={{ margin: 12 }}
          />
          <RaisedButton
            label="Import"
            labelPosition="before"
            icon={<FileDownload />}
            onClick={this.props.openImportModal}
            style={{ margin: 12 }}
          />
          <RaisedButton
            label="Create Report"
            labelPosition="before"
            primary
            onClick={this.props.openCreateReportModal}
            icon={<Add />}
            style={{ margin: 12 }}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

AppToolbar.propTypes = {
  openCreateReportModal: PropTypes.func.isRequired,
  openPrintModal: PropTypes.func.isRequired,
  openImportModal: PropTypes.func.isRequired,
  openExportModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  state: state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openPrintModal, openCreateReportModal, openImportModal, openExportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
