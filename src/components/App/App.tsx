import React, { useState, useEffect } from 'react'

import { UploadAndConfigure } from '../UploadAndConfigure/UploadAndConfigure'
import { MazeView } from '../MazeView/MazeView'
import { createMazeFromString, Maze } from '../../maze'
import defaultMaze from './defaultMaze'

import './App.css'

export function App() {
  const [maze, setMaze] = useState<Maze | undefined>()

  function handleMazeString(inputMaze: string) {
    setMaze(createMazeFromString(inputMaze))
  }

  useEffect(() => {
    setMaze(createMazeFromString(defaultMaze))
  }, [])

  return (
    <div className="App">
      {!maze && <UploadAndConfigure onMazeString={handleMazeString} />}
      {maze && <MazeView maze={maze} />}
    </div>
  )
}
