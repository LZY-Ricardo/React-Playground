import logoSvg from './icons/logo.svg'
import styles from './index.module.scss'

export default function Header() {
  const today = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
  }).format(new Date())

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="React Playground logo" />
        <div className={styles.text}>
          <span className={styles.title}>React Playground</span>
          <span className={styles.subtitle}>Edit, compile and preview instantly</span>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.badge}>Live Compile</span>
        <span className={styles.date}>{today}</span>
      </div>
    </header>
  )
}
