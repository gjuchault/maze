import React from 'react'
import { useSpeed } from '../../hooks/useSpeed'
import { debounce } from '../../helpers/debounce'

import './Speed.css'

interface Props {
  onChange: (value: number) => void
}

export function Speed({ onChange }: Props) {
  const currentValue = useSpeed()

  const debouncedOnChange = debounce(onChange, 500)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedOnChange(e.target.valueAsNumber)
  }

  return (
    <div className="speed">
      <label className="speed__label">
        Speed ({currentValue}ms)
        <input
          type="range"
          className="range"
          min="100"
          max="1000"
          value={currentValue}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
