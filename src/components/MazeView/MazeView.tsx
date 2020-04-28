import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Maze, Facing } from '../../maze'
import { leftWall } from '../../maze/leftWall'
import { Tile } from '../Tile/Tile'
import { useSpeed } from '../../hooks/useSpeed'

import './MazeView.css'

interface Props {
  maze: Maze
}

export function MazeView({ maze: initialMaze }: Props) {
  let timeout = useRef(0)
  let currentIndex = useRef(0)
  let human = useRef<ReturnType<typeof leftWall> | undefined>()
  let [maze, setMaze] = useState(initialMaze)
  let [facing, setFacing] = useState<Facing | null>(null)
  const speed = useSpeed()

  useEffect(() => {
    human.current = leftWall(initialMaze)
  }, [initialMaze])

  const updateMaze = useCallback(() => {
    if (!human.current) return

    if (!human.current.history[currentIndex.current]) {
      window.clearTimeout(timeout.current)
      return
    }

    const { x, y, facing } = human.current.history[currentIndex.current]

    timeout.current = window.setTimeout(updateMaze, speed)

    setFacing(facing)

    setMaze(prevMaze => {
      const cells = prevMaze.cells.slice().map(r =>
        r.slice().map(cell => ({
          ...cell,
          visiting: false
        }))
      )

      cells[y][x] = {
        ...cells[y][x],
        visiting: true,
        visited: cells[y][x].visited + 1
      }

      return {
        ...prevMaze,
        facing,
        cells
      }
    })

    currentIndex.current += 1
  }, [speed, human])

  useEffect(() => {
    timeout.current = window.setTimeout(updateMaze, 500)

    return () => clearTimeout(timeout.current)
  }, [updateMaze])

  return (
    <div className="maze">
      {maze.cells.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map(cell => {
              return <Tile cell={cell} facing={facing} key={cell.id} />
            })}
          </div>
        )
      })}
    </div>
  )
}
