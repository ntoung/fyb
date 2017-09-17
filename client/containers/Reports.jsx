import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Subheader from 'material-ui/Subheader';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import GraphInfo from 'Components/GraphInfo';
import Inputs from 'Components/Inputs';
import Graph from 'Components/Graph';

const Reports = props => (
  <div>
    {
      props.reports.entrySeq().map(([reportId, report]) =>
        (<Card
          key={reportId}
          className="reportContainer"
          initiallyExpanded={false}
          zDepth={1}
          style={{
            margin: '10px 0px',
          }}
        >
          <CardHeader
            title={report.get('name')}
            subtitle={report.get('subtitle')}
            actAsExpander
            showExpandableButton
          />
          <CardText
            style={{
              padding: 0,
            }}
            expandable
          >
            <div className="container">
              <div className="itemSide">
                <div className="graphContainer">
                  <GraphInfo
                    reportId={reportId}
                  />
                  <Subheader>Graph</Subheader>
                  <Graph
                    reportId={reportId}
                  />
                </div>
              </div>
              <div className="itemMain">
                <Inputs
                  reportId={reportId}
                />
              </div>
            </div>
          </CardText>
        </Card>),
      )
    }
  </div>
);

Reports.propTypes = {
  reports: ImmutablePropTypes.orderedMap.isRequired,
};

const mapStateToProps = state => ({
  reports: state.get('Reports').reverse(),
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
