import React, {
  Component
} from 'react';
import {
  Line
} from '@nivo/line';

class LineComponent extends Component {
  render() {
    const { type, color, data} = this.props.readings;
    return ( 
      <Line
        width={1600}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: 80
        }}
        data={[{id: type, color, data}]}
        animate
        curve="monotoneX"
        // xScale={{type: 'time', precision: 'minute'}}
        axisBottom={{orient: 'bottom', tickValues: 2000, tickPadding: 25}}
        enableDotLabel
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
/>

    )
  }
}

export default LineComponent;