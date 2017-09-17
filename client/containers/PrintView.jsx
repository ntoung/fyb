import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const PrintView = props => (
  <div className="printContainer">
    Print View
    {
      props.printList.map(reportId => (
        <div
          key={reportId}
        >
          <h1>{props.reports.get(reportId).get('name')}</h1>
        </div>
      ))
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
