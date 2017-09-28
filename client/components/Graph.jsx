/* global Math */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChartistGraph from 'Components/ChartistGraph';
import Legend from 'chartist-plugin-legend';

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const graphType = 'Pie';

    let total = 0;
    const series = [];

    this.props.inputs.forEach((input, index) => {
      total += (input.get('inputCost'))
        ? input.get('inputCost') * input.get('inputFrequency')
        : 0;

      series.push({
        name: `${(input.get('inputName'))
          ? input.get('inputName') : index + 1}`,
        value: (input.get('inputCost'))
          ? input.get('inputCost') * input.get('inputFrequency') : 0,
        className: '',
        meta: '',
      });
    });

    // total /= 100;
    total = this.props.budget / 100;

    const data = { series };

    const labelInterpolationFnc = value => (
      (value !== 0) ? `${Math.round(value / total)}%` : `${value}%`
    );

    return (
      <ChartistGraph
        data={data}
        type={graphType}
        options={{
          height: '300px',
          labelInterpolationFnc,
          labelOffset: 75,
          chartPadding: 35,
          labelDirection: 'explode',
          showLabel: true,
          plugins: [
            Legend({}),
          ],
        }}
      />
    );
  }
}

Graph.propTypes = {
  inputs: ImmutablePropTypes.list.isRequired,
  budget: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  inputs: state.getIn(['Reports', props.reportId]).get('inputs'),
  budget: state.getIn(['Reports', props.reportId]).get('budget'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
