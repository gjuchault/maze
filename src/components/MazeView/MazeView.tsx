import React, { useEffect, useState, useRef } from 'react'

import { Maze } from '../../maze'
import { leftWall } from '../../maze/leftWall'
import { Tile } from '../Tile/Tile'

import './MazeView.css'

interface Props {
  maze: Maze
}

export function MazeView({ maze }: Props) {
  let timeout = useRef(0)
  let currentIndex = useRef(0)
  let human = useRef(leftWall(maze))
  let [innerMaze, setInnerMaze] = useState(maze)

  useEffect(() => {
    timeout.current = window.setTimeout(updateMaze, 500)
  }, [])

  function updateMaze() {
    if (!human.current.history[currentIndex.current]) {
      window.clearTimeout(timeout.current)
      return
    }

    timeout.current = window.setTimeout(updateMaze, 1000)

    const cells = innerMaze.cells.slice().map(r => r.slice())
    const { x, y } = human.current.history[currentIndex.current]

    console.log('updating', y, x, {
      ...cells[y][x],
      visiting: true,
      visited: cells[y][x].visited + 1
    })
    cells[y][x] = {
      ...cells[y][x],
      visiting: true,
      visited: cells[y][x].visited + 1
    }

    setInnerMaze({
      ...innerMaze,
      cells
    })

    console.log(innerMaze)

    currentIndex.current += 1
  }

  return (
    <div className="maze">
      {innerMaze.cells.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map(cell => {
              return <Tile cell={cell} key={cell.id} />
            })}
          </div>
        )
      })}
    </div>
  )
}
