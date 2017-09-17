import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import Chartist from 'chartist';

class ChartistGraph extends Component {
  componentDidMount() {
    this.updateChart(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  }

  updateChart(config) {
    const { type, data } = config;
    const options = config.options || {};
    const responsiveOptions = config.responsiveOptions || [];

    // Normally we would use chartist.update() but plugins don't re-render as of 8/21/2017
    // so we have to recreate the chart each time. Not optimal but no work around right now.
    this.chartist = new Chartist[type](this.chart, data, options, responsiveOptions);

    if (config.listener) {
      config.listener.forEach((event) => {
        if (Object.prototype.hasOwnProperty.call(config.listener, event)) {
          this.chartist.on(event, config.listener[event]);
        }
      });
    }

    return this.chartist;
  }

  render() {
    const { className, style, children, data, type } = this.props;
    const childrenWithProps = children && Children.map(children, child => (
      cloneElement(child, {
        type,
        data,
      })
    ));
    return (
      <div className={`ct-chart ${className || ''}`} ref={(div) => { this.chart = div; }} style={style}>
        { childrenWithProps }
      </div>
    );
  }
}

ChartistGraph.propTypes = {
  type: PropTypes.oneOf(['Line', 'Bar', 'Pie']).isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  options: PropTypes.object,
  responsiveOptions: PropTypes.array,
  children: PropTypes.array,
  style: PropTypes.object,
};

export default ChartistGraph;
