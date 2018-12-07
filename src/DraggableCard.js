import React, { Component } from 'react'
import Hammer from 'hammerjs'
import ReactDOM from 'react-dom'
import SimpleCard from './SimpleCard'
import { translate3d } from './utils'

export default class DraggableCard extends Component {
  state = {
    x: 0,
    y: 0,
    initialPosition: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
    animation: null,
    pristine: true,
    swiping: false,
    swipeDirection: 'none'
  }

  componentDidMount() {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this))
    this.hammer.add(new Hammer.Pan({ threshold: 2 }))

    this.hammer.on('panstart panend pancancel panmove', this.handlePan)
    this.hammer.on(
      'swipestart swipeend swipecancel swipemove',
      this.handleSwipe
    )

    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop()
      this.hammer.destroy()
      this.hammer = null
    }
    window.removeEventListener('resize', this.resetPosition)
  }

  resetPosition = () => {
    const { x, y } = this.props.containerSize
    const card = ReactDOM.findDOMNode(this)

    const initialPosition = {
      x: Math.round((x - card.offsetWidth) / 2),
      y: Math.round((y - card.offsetHeight) / 2)
    }

    this.setState({
      swipeDirection: 'none',
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition,
      startPosition: { x: 0, y: 0 }
    })
  }

  panstart = () => {
    const { x, y } = this.state
    this.setState({
      swiping: true,
      animation: false,
      startPosition: { x, y },
      pristine: false
    })
  }

  panend = ev => {
    const screen = this.props.containerSize
    const card = ReactDOM.findDOMNode(this)
    const getDirection = () => {
      switch (true) {
        case this.state.x < -50:
          return 'Left'
        case this.state.x + (card.offsetWidth - 50) > screen.x:
          return 'Right'
        case this.state.y < -50:
          return 'Top'
        case this.state.y + (card.offsetHeight - 50) > screen.y:
          return 'Bottom'
        default:
          return false
      }
    }
    const direction = getDirection()

    if (this.props[`onSwipe${direction}`]) {
      this.props[`onSwipe${direction}`]()
      this.props[`onOutScreen${direction}`](this.props.index)
    } else {
      this.resetPosition()
      this.setState({ animation: true, swiping: false })
    }
  }

  panmove = ev => this.setState(this.calculatePosition(ev.deltaX, ev.deltaY))

  pancancel = ev => {
    // console.log(ev.type)
  }

  handlePan = ev => {
    ev.preventDefault()
    this[ev.type](ev)
    return false
  }

  handleSwipe = ev => {
    // console.log(ev.type)
  }

  calculatePosition = (deltaX, deltaY) => {
    const { swipeDirection } = this.state
    const directionVector = Math.abs(deltaY) > Math.abs(deltaX) ? 'Y' : 'X'
    let newSwipeDirection

    if (directionVector === 'Y') {
      newSwipeDirection = deltaY < 0 ? 'top' : 'bottom'
    } else if (directionVector === 'X') {
      newSwipeDirection = deltaX < 0 ? 'left' : 'right'
    }

    if (swipeDirection !== newSwipeDirection) {
      this.setState({ swipeDirection: newSwipeDirection })
    }

    const {
      initialPosition: { x, y }
    } = this.state
    return {
      x: x + deltaX,
      y: y + deltaY
    }
  }

  render() {
    const {
      x,
      y,
      animation,
      pristine,
      swiping,
      swipeDirection,
      initialPosition
    } = this.state

    const style = translate3d(x, y, initialPosition.x, swiping)
    return (
      <SimpleCard
        {...this.props}
        style={style}
        className={animation ? 'animate' : pristine ? 'inactive' : ''}
        swipeDirection={swipeDirection}
        swiping={swiping}
      />
    )
  }
}
