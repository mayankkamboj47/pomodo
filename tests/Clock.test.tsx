import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Clock from '../comp/Clock'

// Mock dispatch function
const dispatch = jest.fn() 

describe('Clock', () => {

  beforeEach(() => {
    dispatch.mockClear()
  })

  it('renders correctly', () => {
    const { asFragment } = render(<Clock endTime={100} dispatch={dispatch} />)
    expect(asFragment()).toMatchSnapshot()
  })

  describe('display', () => {

    it('renders time remaining', () => {
      render(<Clock endTime={100} dispatch={dispatch}/>)
      expect(screen.getByText('1:40')).toBeInTheDocument()
    })

    it('renders time in mm:ss format', () => {
      render(<Clock endTime={61} dispatch={dispatch}/>)
      expect(screen.getByText('1:01')).toBeInTheDocument()
    })

  })

  describe('countdown', () => {

    it('counts down remaining time', async () => {
      jest.useFakeTimers()
      render(<Clock endTime={100} status="running" dispatch={dispatch}/>)

      jest.advanceTimersByTime(2000)
      expect(screen.getByText('1:38')).toBeInTheDocument()
    })

    it('pauses countdown when status is not running', async () => {
      jest.useFakeTimers()
      render(<Clock endTime={100} status="paused" dispatch={dispatch}/>)

      jest.advanceTimersByTime(2000)
      expect(screen.getByText('1:40')).toBeInTheDocument() 
    })

    it('clears interval on unmount', () => {
      jest.useFakeTimers()
      const { unmount } = render(<Clock endTime={100} status="running" dispatch={dispatch}/>)
      unmount()

      expect(clearInterval).toHaveBeenCalledTimes(1)
    })

  })

  describe('completion', () => {

    it('dispatches beep when countdown completes', async () => {
      render(<Clock endTime={0} status="running" dispatch={dispatch}/>)

      jest.advanceTimersByTime(1000)
      expect(dispatch).toHaveBeenCalledWith({type: 'beep'})
    })

    it('clears interval when countdown completes', async () => {
      jest.useFakeTimers()
      render(<Clock endTime={0} status="running" dispatch={dispatch}/>)

      jest.advanceTimersByTime(1000)
      expect(clearInterval).toHaveBeenCalledTimes(1)
    })

  })

  describe('interactions', () => {

    it('dispatches stop-resume on button click', () => {
      render(<Clock endTime={100} status="running" dispatch={dispatch}/>)

      userEvent.click(screen.getByRole('button'))
      expect(dispatch).toHaveBeenCalledWith({
        type: 'clock.stop-resume', 
        clockTime: 100  
      })
    })

    it('toggles pause icon on button click', async () => {
      render(<Clock endTime={100} status="running" dispatch={dispatch}/>)

      expect(screen.getByTestId('play-icon')).toBeInTheDocument()

      userEvent.click(screen.getByRole('button'))

      expect(screen.getByTestId('pause-icon')).toBeInTheDocument()
    })

  })

})