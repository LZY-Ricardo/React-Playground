import { useEffect, useState } from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from '../components/Header'
import CodeEditor from '../components/CodeEditor'
import Preview from '../components/Preview'
import styles from './index.module.scss'

const MOBILE_BREAKPOINT = 860

const getInitialStackedState = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
}

export default function ReactPlayground() {
  const [stackedLayout, setStackedLayout] = useState(getInitialStackedState)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handleLayoutChange = (event: MediaQueryListEvent) => {
      setStackedLayout(event.matches)
    }

    setStackedLayout(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleLayoutChange)

    return () => {
      mediaQuery.removeEventListener('change', handleLayoutChange)
    }
  }, [])

  const paneMinSize = stackedLayout ? 180 : 260

  return (
    <div className={styles.playground}>
      <Header />
      <div className={styles.workspace}>
        <Allotment vertical={stackedLayout} defaultSizes={stackedLayout ? [56, 44] : [54, 46]}>
          <Allotment.Pane minSize={paneMinSize}>
            <section className={styles.pane}>
              <div className={styles['pane-surface']}>
                <CodeEditor />
              </div>
            </section>
          </Allotment.Pane>

          <Allotment.Pane minSize={paneMinSize}>
            <section className={styles.pane}>
              <div className={styles['pane-surface']}>
                <Preview />
              </div>
            </section>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
