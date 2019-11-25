import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import actionSubscription, {withActionSubscription} from '../index'

const actionEmitter = new actionSubscription.ActionEmitter()

class Test extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      components: []
    }
  }

  addComponent = () => {
    const {component} = this.props
    const {components} = this.state
    components.push(withActionSubscription(component))
    this.setState(state => ({
      ...state,
      components
    }))
  }

  removeComponent = () => {
    const {components} = this.state
    components.splice(-1, 1)
    this.setState(state => ({
      ...state,
      components
    }))
  }

  render() {
    return (
      <actionSubscription.Provider actionEmitter={actionEmitter}>
        <button onClick={this.addComponent}>Add</button>
        <button onClick={this.removeComponent}>Remove</button>
        {this.state.components.map((Component, index) => <Component key={index}/>)}
      </actionSubscription.Provider>
    )
  }
}

describe('ActionSubscription', () => {
  // eslint-disable-next-line max-statements
  it('should un/subscribe components to actions', () => {
    const actionSuccess = 'ON_SUCCESS'
    const actionDelete = 'ON_DELETE'
    const onSuccess = jest.fn()
    const onNothing = jest.fn()

    const component = props => {
      props.actionSubscription.addSubscriber(actionSuccess, onSuccess)
      props.actionSubscription.addSubscriber(actionDelete, onNothing)
      props.actionSubscription.removeSubscriber(actionDelete)
      return null
    }

    expect(actionEmitter.subscriber).toBeNull()

    const {unmount, getByText} = render(<Test component={component} />)
    const addButton = getByText('Add')
    const removeButton = getByText('Remove')

    expect(actionEmitter.subscriber).not.toBeNull()

    fireEvent.click(addButton)
    fireEvent.click(addButton)
    fireEvent.click(removeButton)

    actionEmitter.emit(actionSuccess)
    actionEmitter.emit(actionDelete)

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onNothing).not.toHaveBeenCalled()

    unmount()

    expect(actionEmitter.subscriber).toBeNull()
  })
})
