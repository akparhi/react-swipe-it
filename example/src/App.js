import React, { Component } from 'react';

import Cards, { Card } from 'react-swipe-it';

import './App.css';
const data = ['Birth', 'Life', 'Death'];
const directionColorMap = {
  left: 'rgba(235,109,110, 0.5)',
  right: 'rgba(106, 155, 22, 0.5)',
  top: 'rgba(255, 255, 0, 0.5)',
  bottom: 'rgba(255, 0, 255, 0.5)',
};

const CustomAlertLeft = () => <span>Nop</span>;
const CustomAlertRight = () => <span>Ok</span>;
const FancyCard = props => {
  return (
    <div
      className="card"
      style={{
        backgroundColor: directionColorMap[props.swipeDirection],
      }}
    >
      <h2>{props.name}</h2>
    </div>
  );
};

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>react swipe card</h1>
        <Cards
          onEnd={() => console.log('end')}
          className="master-root"
          alertRight={<CustomAlertRight />}
          alertLeft={<CustomAlertLeft />}
        >
          {data.map((item, key) => (
            <Card
              key={key}
              onSwipeTop={() => console.log('swipe top')}
              onSwipeBottom={() => console.log('swipe bottom')}
              onSwipeLeft={() => console.log('swipe left')}
              onSwipeRight={() => console.log('swipe right')}
            >
              <FancyCard name={item} />
            </Card>
          ))}
        </Cards>
      </div>
    );
  }
}
