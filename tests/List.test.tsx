import { render, screen, fireEvent } from '@testing-library/react'
import List from '../comp/List'

describe('List', () => {
  test('renders list name', () => {
    render(<List name="Groceries" children={[]}/>)
    
    expect(screen.getByText('Groceries')).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <List name="Groceries">
        <p>Milk</p>
        <p>Bread</p>
      </List>  
    )
    
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.getByText('Bread')).toBeInTheDocument()
  })

  test('opens editor on name click', () => {
    render(<List name="Groceries" children={[]} id={1}/>)
    
    fireEvent.click(screen.getByText('Groceries'))
    
    expect(screen.getByDisplayValue('Groceries')).toBeInTheDocument()
  })

  test('dispatches rename on blur', () => {
    const dispatch = jest.fn()
    render(<List name="Groceries" dispatch={dispatch} id="1" />)

    fireEvent.click(screen.getByText('Groceries'))
    fireEvent.change(screen.getByDisplayValue('Groceries'), { target: { value: 'Food' } })
    fireEvent.blur(screen.getByDisplayValue('Food'))

    expect(dispatch).toHaveBeenCalledWith({'type':'list.rename', name:'Food', id : "1"});
  })

  test('dispatches add task on button click', () => {
    const dispatch = jest.fn()
    render(<List name="Groceries" dispatch={dispatch} id="1" />)

    fireEvent.click(screen.getByText('+'))

    expect(dispatch).toHaveBeenCalled()
  })
})