import React, {
  Component
} from 'react';
import {
  Line
} from '@nivo/line';

class LineComponent extends Component {
  render() {
    return ( 
      <Line
  width={900}
  height={400}
  margin={{
    top: 20,
    right: 20,
    bottom: 60,
    left: 80
  }}
  data={[
    {id: 'whisky',color: 'hsl(297, 70%, 50%)',data: [
        {color: 'hsl(282, 70%, 50%)',x: 'VN',y: 20},
        {color: 'hsl(284, 70%, 50%)',x: 'BA',y: 7},
        {color: 'hsl(217, 70%, 50%)',x: 'DZ',y: 35},
        
      ]},
    {id: 'rhum',color: 'hsl(286, 70%, 50%)',data: [
        {color: 'hsl(122, 70%, 50%)',x: 'VN',y: 50},
        {color: 'hsl(121, 70%, 50%)',x: 'BA',y: 44},
        {color: 'hsl(2, 70%, 50%)',x: 'DZ',y: 30},
        
      ]},
    {id: 'gin',color: 'hsl(139, 70%, 50%)',data: [
        {color: 'hsl(200, 70%, 50%)',x: 'VN',y: 12},
        {color: 'hsl(4, 70%, 50%)',x: 'BA',y: 42},
        {color: 'hsl(243, 70%, 50%)',x: 'DZ',y: 14},
        
      ]},
    {id: 'vodka',color: 'hsl(350, 70%, 50%)',data: [
        {color: 'hsl(28, 70%, 50%)',x: 'VN',y: 19},
        {color: 'hsl(157, 70%, 50%)',x: 'BA',y: 31},
        {color: 'hsl(230, 70%, 50%)',x: 'DZ',y: 35},
        
      ]},
    {id: 'cognac',color: 'hsl(42, 70%, 50%)',data: [
        {color: 'hsl(341, 70%, 50%)',x: 'VN',y: 49},
        {color: 'hsl(84, 70%, 50%)',x: 'BA',y: 52},
        {color: 'hsl(356, 70%, 50%)',x: 'DZ',y: 41},
        
      ]}
  ]}
  animate
/>

    )
  }
}

export default LineComponent;