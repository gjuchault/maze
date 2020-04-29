import React, { useState, useEffect } from 'react'

import { SpeedContext } from '../Speed/context'
import { VisibilityContext, VisibilityState } from '../Visibility/context'
import { Visibility } from '../Visibility/Visibility'
import { UploadAndConfigure } from '../UploadAndConfigure/UploadAndConfigure'
import { MazeView } from '../MazeView/MazeView'
import { Speed } from '../Speed/Speed'
import { createMazeFromString, Maze } from '../../maze'
import defaultMaze from './defaultMaze'

import './App.css'

export function App() {
  const [maze, setMaze] = useState<Maze | undefined>()
  const [speed, setSpeed] = useState(500)
  const [visibility, setVisibility] = useState<VisibilityState>('robot')

  function handleMazeString(inputMaze: string) {
    setMaze(createMazeFromString(inputMaze))
  }

  useEffect(() => {
    setMaze(createMazeFromString(defaultMaze))
  }, [])

  return (
    <SpeedContext.Provider value={speed}>
      <VisibilityContext.Provider value={visibility}>
        <div className="App">
          <div className="settings">
            <h4>Settings</h4>
            <Speed onChange={setSpeed} />
            <Visibility onChange={setVisibility} />
          </div>
          {!maze && <UploadAndConfigure onMazeString={handleMazeString} />}
          {maze && <MazeView maze={maze} />}
        </div>
      </VisibilityContext.Provider>
    </SpeedContext.Provider>
  )
}
