import { Cell } from '.'

export const uniqueCells = (cells: Cell[]) => {
  const cellsIds = cells.map(cell => `${cell.x}-${cell.y}`)
  const uniqueCellsIds = Array.from(new Set(cellsIds))

  return uniqueCellsIds.map(id => {
    const [idX, idY] = id.split('-')

    return cells.find(({ x, y }) => {
      return x === Number(idX) && y === Number(idY)
    })
  })
}
