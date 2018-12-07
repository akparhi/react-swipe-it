import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { translate3d } from './utils'

export default class Card extends Component {
  state = { initialPosition: { x: 0, y: 0 } }

  componentDidMount() {
    this.setInitialPosition()
    window.addEventListener('resize', this.setInitialPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition)
  }

  setInitialPosition = () => {
    const card = ReactDOM.findDOMNode(this)
    const {
      containerSize: { x, y }
    } = { ...this.props }
    const initialPosition = {
      x: Math.round((x - card.offsetWidth) / 2),
      y: Math.round((y - card.offsetHeight) / 2)
    }

    this.setState({ initialPosition })
  }

  render() {
    const {
      initialPosition: { x, y }
    } = this.state
    const {
      children,
      className = 'inactive',
      index,
      style,
      swiping,
      swipeDirection
    } = {
      ...this.props
    }
    const childrenWithNewProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        swipeDirection,
        swiping
      })
    })

    return (
      <div
        className={`card ${className}`}
        style={{
          ...translate3d(x, y),
          zIndex: index,
          ...style
        }}
      >
        {childrenWithNewProps}
      </div>
    )
  }
}
