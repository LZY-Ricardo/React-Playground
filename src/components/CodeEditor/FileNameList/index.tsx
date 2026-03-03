import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../ReactPlayground/PlaygroundContext'
import FileNameItem from './FileNameItem'
import styles from './index.module.scss'
import { ENTRY_FILE_NAME } from '../../../ReactPlayground/files'

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    addFile,
    removeFile,
    updateFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState<string[]>([])
  const [creating, setCreating] = useState(false)

  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }

  const handleEditComplete = (oldName: string, newName: string) => {
    if (oldName === newName) {
      return
    }
    updateFileName(oldName, newName)
    setSelectedFileName(newName)
    setCreating(false)
  }

  const addTab = () => {
    const newFileName = `Comp${Math.random().toString().slice(2, 5)}.tsx`
    addFile(newFileName)
    setSelectedFileName(newFileName)
    setCreating(true)
  }

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index, arr) => (
        <FileNameItem
          key={tab}
          value={tab}
          creating={creating && index === arr.length - 1}
          actived={tab === selectedFileName}
          onClick={() => setSelectedFileName(tab)}
          onRemove={(event) => {
            event.stopPropagation()
            handleRemove(tab)
          }}
          onEditComplete={(newName) => handleEditComplete(tab, newName)}
        />
      ))}
      <button type="button" className={styles.add} onClick={addTab} aria-label="Create new file">
        +
      </button>
    </div>
  )
}
