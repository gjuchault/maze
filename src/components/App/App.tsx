import React, { useState, useEffect } from 'react'

import { SpeedContext } from '../Speed/context'
import { UploadAndConfigure } from '../UploadAndConfigure/UploadAndConfigure'
import { MazeView } from '../MazeView/MazeView'
import { Speed } from '../Speed/Speed'
import { createMazeFromString, Maze } from '../../maze'
import defaultMaze from './defaultMaze'

import './App.css'

export function App() {
  const [maze, setMaze] = useState<Maze | undefined>()
  const [speed, setSpeed] = useState(500)

  function handleMazeString(inputMaze: string) {
    setMaze(createMazeFromString(inputMaze))
  }

  useEffect(() => {
    setMaze(createMazeFromString(defaultMaze))
  }, [])

  return (
    <SpeedContext.Provider value={speed}>
      <div className="App">
        <div className="settings">
          <h4>Settings</h4>
          <Speed onChange={setSpeed} />
        </div>
        {!maze && <UploadAndConfigure onMazeString={handleMazeString} />}
        {maze && <MazeView maze={maze} />}
      </div>
    </SpeedContext.Provider>
  )
}
