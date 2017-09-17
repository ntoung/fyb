import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import AppToolbar from 'Components/AppToolbar';
import Reports from 'Containers/Reports';
import PrintView from 'Containers/PrintView';
import CreateReportModal from 'Modals/CreateReportModal';
import PrintModal from 'Modals/PrintModal';

const App = () => (
  <div>
    <div className="mainContainer">
      <Paper>
        <AppToolbar
          style={{
            height: '90%',
            width: '90%',
            margin: '0px auto',
            padding: '25px',
          }}
        />
      </Paper>
      <Reports />
      <CreateReportModal />
      <PrintModal />
    </div>
    <div className="printContainer">
      <PrintView />
    </div>
  </div>
);


const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
