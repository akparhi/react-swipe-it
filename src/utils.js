const calculateAngle = (distance, boundary = 300) => {
  let radians
  radians = distance / boundary
  if (radians < 0) {
    radians = Math.max(radians, -1)
  } else {
    radians = Math.min(radians, 1)
  }
  const degrees = radians * (180 / Math.PI)
  // console.log(degrees);
  return degrees
}

export const translate3d = (x, y, cardOffset = 0, swiping = false) => {
  let translate
  if (!swiping) {
    translate = `translate3d(${x}px, ${y}px, 0px)`
  } else {
    translate = `translate3d(${x}px, ${y}px, 0) rotate(${calculateAngle(
      x - cardOffset
    )}deg)`
  }

  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  }
}

export const DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom']
