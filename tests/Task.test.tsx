import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Task from '../comp/Task';

describe('Task', () => {

  it('renders task value', () => {
    render(<Task value="Take out trash" />);
    expect(screen.getByText('Take out trash')).toBeInTheDocument();
  });

  it('selects task on click', () => {
    const dispatch = jest.fn();
    render(<Task id={1} dispatch={dispatch} value="take out trash" points={4}/>);
      
    fireEvent.click(screen.getByTestId('1'));
    expect(dispatch).toHaveBeenCalled();
  });

  it('edits task value on edit', async () => {
    const dispatch = jest.fn();
    render(<Task id={1} value="Take out trash" dispatch={dispatch} points={4}/>);
    let user = userEvent.setup();
    fireEvent.click(screen.getByTestId("task-value"));
    await user.keyboard('{backspace}'.repeat(15) + 'Take out recycling');
    fireEvent.blur(screen.getByDisplayValue('Take out recycling'));
    
    expect(dispatch).toHaveBeenCalledWith({
      type: 'task.edit',
      id: 1,
      value: 'Take out recycling'
    });
  });

  it('deletes task on delete button click', async () => {
    let user = userEvent.setup();
    const dispatch = jest.fn();
    render(<Task id={1} dispatch={dispatch} />);
      
    await user.click(screen.getByRole('button', {name: /×/i}));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'task.delete',
      taskId: 1
    });
  });

  it('rotates based on id', () => {
    render(<Task id={1} />);
    expect(screen.getByTestId('1')).toHaveStyle('transform: rotate(0.8393923158582766deg)');

    render(<Task id={2} />);
    expect(screen.getByTestId('2')).toHaveStyle('transform: rotate(1.8970730272703804deg)'); 
  });

});