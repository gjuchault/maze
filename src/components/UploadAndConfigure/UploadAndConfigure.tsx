import React from 'react'

interface Props {
  onMazeString: (inputMaze: string) => void
}

export function UploadAndConfigure({ onMazeString }: Props) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files || !files.length) {
      return
    }

    const file = files.item(0)

    if (!file) {
      return
    }

    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.addEventListener('load', e => {
      const content = e.target?.result

      if (!content) {
        return
      }

      onMazeString(content.toString().trim())
    })
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />
    </div>
  )
}
