import { VisibilityContext } from '../components/Visibility/context'
import { useContext } from 'react'

export function useVisibility() {
  return useContext(VisibilityContext)
}
