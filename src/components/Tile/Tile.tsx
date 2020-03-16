import React from 'react'
import cx from 'classnames'
import { Cell } from '../../maze'

import './Tile.css'

interface Props {
  cell: Cell
}

export function Tile({ cell }: Props) {
  const tile = cx('tile', {
    wall: cell.isWall,
    floor: !cell.isWall,
    entrance: cell.isEntrance,
    exit: cell.isExit,
    visiting: cell.visiting,
    visited: cell.visited > 1
  })

  const content = cell.visited > 1 ? cell.visited : ''

  return <div className={tile}>{content}</div>
}
