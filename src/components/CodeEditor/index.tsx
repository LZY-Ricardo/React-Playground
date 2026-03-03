import { useCallback, useContext, useEffect, useMemo } from 'react'
import { debounce } from 'lodash-es'
import Editor from './Editor'
import FileNameList from './FileNameList'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import styles from './index.module.scss'

export default function CodeEditor() {
  const { files, setFiles, selectedFileName } = useContext(PlaygroundContext)
  const file = files[selectedFileName]

  const onEditorChange = useCallback(
    (value?: string) => {
      if (typeof value !== 'string') {
        return
      }
      setFiles({
        ...files,
        [selectedFileName]: {
          ...files[selectedFileName],
          value,
        },
      })
    },
    [files, selectedFileName, setFiles],
  )

  const debouncedEditorChange = useMemo(() => debounce(onEditorChange, 220), [onEditorChange])

  useEffect(() => {
    return () => {
      debouncedEditorChange.cancel()
    }
  }, [debouncedEditorChange])

  return (
    <div className={styles['editor-shell']}>
      <FileNameList />
      <div className={styles['editor-body']}>
        <Editor file={file} onChange={debouncedEditorChange} />
      </div>
    </div>
  )
}
