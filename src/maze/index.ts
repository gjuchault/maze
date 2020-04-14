import { SwitchGuardError } from '../switchGuard'

export interface Maze {
  cells: Cell[][]
  entrypoint: { x: number; y: number }
  getCell: (x: number, y: number) => Cell
  getSiblings: (
    x: number,
    y: number
  ) => {
    north: Cell
    east: Cell
    south: Cell
    west: Cell
  }
}

export interface Cell {
  id: string
  x: number
  y: number
  character: Character
  visited: number
  visiting: boolean
  isExit: boolean
  isEntrance: boolean
  isWall: boolean
  openings: {
    north: boolean
    east: boolean
    south: boolean
    west: boolean
  }
}

export type Facing = 'north' | 'east' | 'south' | 'west'

type Character = '#' | '.' | 'I' | 'O'

export function createMazeFromString(rawInput: string): Maze {
  const input = rawInput
    .split('\n')
    .map(line => line.split('')) as Character[][]

  let entrypoint = { x: -1, y: -1 }

  const cells = input.map((row, y) => {
    return row.map((char, x) => {
      const cell = getCellFromCharacter(char, x, y)

      if (cell.isEntrance) {
        entrypoint = { x, y }
      }

      return cell
    })
  })

  function getCell(x: number, y: number) {
    return (cells[y] || [])[x] || undefined
  }

  function getSiblings(x: number, y: number) {
    return {
      north: getCell(x, y - 1),
      east: getCell(x + 1, y),
      south: getCell(x, y + 1),
      west: getCell(x - 1, y)
    }
  }

  return {
    cells,
    entrypoint,
    getCell,
    getSiblings
  }
}

function getCellFromCharacter(
  character: Character,
  x: number,
  y: number
): Cell {
  const cell = {
    id: `${x}-${y}`,
    x,
    y,
    visited: 0,
    visiting: false,
    isExit: false,
    isEntrance: false,
    isWall: false,
    openings: {
      north: false,
      east: false,
      south: false,
      west: false
    }
  }

  switch (character) {
    case '#':
      return { ...cell, character, isWall: true }
    case '.':
      return { ...cell, character }
    case 'I':
      return { ...cell, character, isEntrance: true }
    case 'O':
      return { ...cell, character, isExit: true }
    default:
      throw new SwitchGuardError(character)
  }
}
