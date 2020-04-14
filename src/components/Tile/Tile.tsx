import React from 'react'
import cx from 'classnames'
import { Cell, Facing } from '../../maze'
import { ReactComponent as Arrow } from './arrow.svg'

import './Tile.css'

interface Props {
  cell: Cell
  facing: Facing | null
}

export function Tile({ cell, facing }: Props) {
  const tile = cx('tile', {
    wall: cell.isWall,
    floor: !cell.isWall,
    entrance: cell.isEntrance,
    exit: cell.isExit,
    visiting: cell.visiting,
    visited: cell.visited >= 1
  })

  if (cell.visiting) {
    return (
      <div className={tile}>
        <div className={cx('arrow', facing)}>
          <Arrow />
        </div>
      </div>
    )
  } else if (cell.visited > 1) {
    return <div className={tile}>{cell.visited}</div>
  }

  return <div className={tile} />
}
