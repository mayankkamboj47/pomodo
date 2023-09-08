import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Clock from '../comp/Clock'; 

describe('Clock', () => {

  it('renders time in mm:ss format', () => {
    render(<Clock time={75} />);
    expect(screen.getByText('1:15')).toBeInTheDocument();
  });

  it('dispatches type change on click', () => {
    const dispatch = jest.fn();
    render(<Clock dispatch={dispatch} time={75} type={'break'} />);

    userEvent.click(screen.getByTestId('clock'));
    expect(dispatch).toHaveBeenCalled();
  });

  it('dispatches stop/resume on button click', () => {
    const dispatch = jest.fn();
    render(<Clock dispatch={dispatch} time={75} type={'break'} />);

    userEvent.click(screen.getByText('break'));
    expect(dispatch).toHaveBeenCalled();
  });

  it('shows pause icon when running', () => {
    render(<Clock status="running" />);
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('shows play icon when stopped', () => {
    render(<Clock status="stopped" />);
    expect(screen.getByText('Play')).toBeInTheDocument(); 
  });

});