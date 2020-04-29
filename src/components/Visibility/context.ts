import React from 'react'

export type VisibilityState = 'robot' | 'human'

export const VisibilityContext = React.createContext<VisibilityState>('robot')
