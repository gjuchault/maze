import React from 'react'
import { useVisibility } from '../../hooks/useVisibility'
import { VisibilityState } from './context'

import './Visibility.css'

interface Props {
  onChange: (value: VisibilityState) => void
}

export function Visibility({ onChange }: Props) {
  const currentValue = useVisibility()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'robot' || e.target.value === 'human') {
      onChange(e.target.value)
    }
  }

  return (
    <div className="Visibility">
      <label className="Visibility__label">
        Visibility
        <select
          className="Visibility__select"
          onChange={handleChange}
          value={currentValue}
        >
          <option value="robot">Robot</option>
          <option value="human">Human</option>
        </select>
      </label>
    </div>
  )
}
