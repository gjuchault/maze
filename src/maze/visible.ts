import { Maze, Cell } from '.'
import { uniqueCells } from './unique'

export const getHumanVisibleCells = (maze: Maze) => {
  const siblings: Cell[] = []

  for (const row of maze.cells) {
    for (const cell of row) {
      if (cell.visited) {
        siblings.push(...Object.values(maze.getSiblings(cell.x, cell.y)))
      }
    }
  }

  return uniqueCells(siblings)
}
