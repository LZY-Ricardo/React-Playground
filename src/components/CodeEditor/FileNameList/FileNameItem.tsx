import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

interface FileNameItemProps {
  value: string
  actived: boolean
  onClick: () => void
  onEditComplete: (name: string) => void
  creating: boolean
  onRemove: (event: React.MouseEvent) => void
}

export default function FileNameItem(props: FileNameItemProps) {
  const { value, actived = false, onClick, onEditComplete, creating, onRemove } = props
  const [name, setName] = useState(value)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing || creating) {
      inputRef.current?.focus()
    }
  }, [creating, editing])

  useEffect(() => {
    setName(value)
  }, [value])

  return (
    <div className={classNames(styles['tab-item'], { [styles.actived]: actived })} onClick={onClick}>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={name}
          className={styles['tabs-item-input']}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            setEditing(false)
            onEditComplete(name)
          }}
        />
      ) : (
        <>
          <span className={styles['tab-label']} onDoubleClick={() => setEditing(true)}>
            {name}
          </span>
          <button type="button" className={styles['close-btn']} onClick={onRemove} aria-label={`Remove ${name}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <line stroke="currentColor" x1="18" y1="6" x2="6" y2="18" />
              <line stroke="currentColor" x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
