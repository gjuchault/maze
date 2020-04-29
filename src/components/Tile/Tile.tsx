import React from 'react'
import cx from 'classnames'
import { Cell, Explorer } from '../../maze'
import { ReactComponent as Arrow } from './arrow.svg'

import './Tile.css'

interface Props {
  cell: Cell
  explorers: Explorer[]
}

export function Tile({ cell, explorers }: Props) {
  const explorerVisiting = explorers.find(
    ({ x, y }) => cell.x === x && cell.y === y
  )

  const tile = cx('tile', {
    wall: cell.isWall,
    floor: !cell.isWall,
    entrance: cell.isEntrance,
    exit: cell.isExit,
    visiting: explorerVisiting,
    visited: cell.visited >= 1
  })

  if (explorerVisiting) {
    return (
      <div className={tile}>
        <div className={cx('arrow', explorerVisiting.facing)}>
          <Arrow />
        </div>
      </div>
    )
  } else if (cell.visited > 1) {
    return <div className={tile}>{cell.visited}</div>
  }

  return <div className={tile} />
}
