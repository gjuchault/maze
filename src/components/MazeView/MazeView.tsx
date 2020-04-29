import React, { useEffect, useState, useRef, useCallback } from 'react'

import { Maze, Explorer, Resolver } from '../../maze'
import { leftWall } from '../../maze/leftWall'
import { Tile } from '../Tile/Tile'
import { useSpeed } from '../../hooks/useSpeed'
import { useVisibility } from '../../hooks/useVisibility'

import './MazeView.css'

interface Props {
  maze: Maze
  resolver?: Resolver
}

export function MazeView({ maze: initialMaze, resolver = leftWall }: Props) {
  const timeout = useRef(0)
  const currentIndex = useRef(0)
  const [maze, setMaze] = useState(initialMaze)
  const [resolution, setResolution] = useState<Explorer[][]>([])
  const [explorers, setExplorers] = useState<Explorer[]>([])
  const speed = useSpeed()
  const visibility = useVisibility()

  useEffect(() => {
    setResolution(initialMaze.resolve(resolver))
  }, [initialMaze, resolver])

  const updateMaze = useCallback(() => {
    let movedAtLeastOneExplorer = false

    const newExplorers: Explorer[] = []
    for (const explorerHistory of resolution) {
      if (!explorerHistory[currentIndex.current]) {
        continue
      }

      const historyEntry = explorerHistory[currentIndex.current]
      newExplorers.push(historyEntry)

      setMaze(currentMaze => {
        return {
          ...currentMaze,
          cells: currentMaze.cells.map(row => {
            return row.map(cell => {
              if (cell.x === historyEntry.x && cell.y === historyEntry.y) {
                return {
                  ...cell,
                  visited: cell.visited + 1
                }
              }

              return cell
            })
          })
        }
      })

      movedAtLeastOneExplorer = true
    }

    if (movedAtLeastOneExplorer) {
      setExplorers(newExplorers)

      timeout.current = window.setTimeout(updateMaze, speed)
    }

    currentIndex.current += 1
  }, [speed, resolution])

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
              return <Tile cell={cell} explorers={explorers} key={cell.id} />
            })}
          </div>
        )
      })}
    </div>
  )
}
