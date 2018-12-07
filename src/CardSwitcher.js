import { createElement } from 'react'

import SimpleCard from './SimpleCard'
import DraggableCard from './DraggableCard'

export default ({ active = false, ...props }) => {
  const component = active ? DraggableCard : SimpleCard
  return createElement(component, props)
}
