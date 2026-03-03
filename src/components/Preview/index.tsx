import { useContext, useEffect, useMemo, useState } from 'react'
import { compile } from './compiler'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../ReactPlayground/files'
import styles from './index.module.scss'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [code, setCode] = useState('')

  useEffect(() => {
    setCode(compile(files) as string)
  }, [files])

  const iframeUrl = useMemo(() => {
    return iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace('<script type="module"></script>', `<script type="module">${code}</script>`)
  }, [code, files])

  return (
    <div className={styles['preview-shell']}>
      <div className={styles['preview-bar']}>
        <div className={styles.dots} aria-hidden="true">
          <span className={`${styles.dot} ${styles['dot-red']}`} />
          <span className={`${styles.dot} ${styles['dot-yellow']}`} />
          <span className={`${styles.dot} ${styles['dot-green']}`} />
        </div>
        <span className={styles.title}>Live Preview</span>
      </div>
      <div className={styles['preview-body']}>
        <iframe title="React playground preview" srcDoc={iframeUrl} className={styles.frame} />
      </div>
    </div>
  )
}
