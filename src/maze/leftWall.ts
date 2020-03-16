import { Maze } from './index'

interface Human {
  x: number
  y: number
  facing: 'north' | 'east' | 'south' | 'west'
  history: { x: number; y: number }[]
}

export function leftWall(maze: Maze) {
  const { entrypoint } = maze

  let human: Human = {
    x: entrypoint.x,
    y: entrypoint.y,
    facing: 'south',
    history: []
  }

  let i = 0
  while (1) {
    human.history.push({ x: human.x, y: human.y })

    const cell = maze.getCell(human.x, human.y)

    if (cell.isExit) {
      break
    }

    const siblings = maze.getSiblings(human.x, human.y)

    const hisLeft = getLeft(human.facing)
    const hisRight = getRight(human.facing)
    const hisBack = getBack(human.facing)

    if (!siblings[hisLeft].isWall) {
      human.facing = hisLeft
    } else if (!siblings[human.facing].isWall) {
      // human.facing = human.facing
    } else if (!siblings[hisRight].isWall) {
      human.facing = hisRight
    } else {
      human.facing = hisBack
    }

    if (human.facing === 'north') human = { ...human, y: human.y - 1 }
    if (human.facing === 'east') human = { ...human, x: human.x + 1 }
    if (human.facing === 'south') human = { ...human, y: human.y + 1 }
    if (human.facing === 'west') human = { ...human, x: human.x - 1 }

    i += 1

    if (i === 300) {
      break
    }
  }

  return human
}

function getLeft(facing: Human['facing']): Human['facing'] {
  switch (facing) {
    case 'north':
      return 'west'
    case 'east':
      return 'north'
    case 'south':
      return 'east'
    case 'west':
      return 'south'
  }
}

function getRight(facing: Human['facing']): Human['facing'] {
  switch (facing) {
    case 'north':
      return 'east'
    case 'east':
      return 'south'
    case 'south':
      return 'west'
    case 'west':
      return 'north'
  }
}

function getBack(facing: Human['facing']): Human['facing'] {
  switch (facing) {
    case 'north':
      return 'south'
    case 'east':
      return 'west'
    case 'south':
      return 'north'
    case 'west':
      return 'east'
  }
}
