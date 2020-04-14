import { SpeedContext } from '../components/Speed/context'
import { useContext } from 'react'

export function useSpeed() {
  return useContext(SpeedContext)
}
