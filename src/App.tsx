import './App.scss'
import ReactPlayground from './ReactPlayground'
import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext'

export default function App() {
  return (
    <PlaygroundProvider>
      <div className="app-shell">
        <ReactPlayground />
      </div>
    </PlaygroundProvider>
  )
}
