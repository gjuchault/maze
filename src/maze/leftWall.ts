import { Maze, Facing, Explorer } from './index'

export function leftWall(maze: Maze) {
  const { entrypoint } = maze

  let explorer: Explorer = {
    x: entrypoint.x,
    y: entrypoint.y,
    facing: 'south'
  }

  const history: Explorer[] = []

  while (1) {
    history.push({
      x: explorer.x,
      y: explorer.y,
      facing: explorer.facing
    })

    const cell = maze.getCell(explorer.x, explorer.y)

    if (cell.isExit) {
      break
    }

    const siblings = maze.getSiblings(explorer.x, explorer.y)
    const facing = explorer.facing

    const hisLeft = getLeft(facing)
    const hisRight = getRight(facing)
    const hisBack = getBack(facing)

    if (!siblings[hisLeft].isWall) {
      explorer = { ...explorer, facing: hisLeft }
    } else if (!siblings[explorer.facing].isWall) {
      // explorer = { ...explorer, facing: explorer.facing }
    } else if (!siblings[hisRight].isWall) {
      explorer = { ...explorer, facing: hisRight }
    } else {
      explorer = { ...explorer, facing: hisBack }
    }

    // push the "turning" step in history
    if (explorer.facing !== facing) {
      history.push({
        x: explorer.x,
        y: explorer.y,
        facing: explorer.facing
      })
    }

    if (explorer.facing === 'north')
      explorer = { ...explorer, y: explorer.y - 1 }
    else if (explorer.facing === 'east')
      explorer = { ...explorer, x: explorer.x + 1 }
    else if (explorer.facing === 'south')
      explorer = { ...explorer, y: explorer.y + 1 }
    else explorer = { ...explorer, x: explorer.x - 1 }
  }

  return [history]
}

function getLeft(facing: Facing): Facing {
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

function getRight(facing: Facing): Facing {
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

function getBack(facing: Facing): Facing {
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
