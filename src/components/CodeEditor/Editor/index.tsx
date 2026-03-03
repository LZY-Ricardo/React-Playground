import { Editor as MonacoEditor } from '@monaco-editor/react'
import type { EditorProps, OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from './ata'

interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const handleEditorMount: OnMount = (instance, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowJs: true,
    })

    const ata = createATA((code, path) => {
      try {
        const uri = path.startsWith('file://') ? path : `file://${path}`
        const existingLibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs()
        if (!existingLibs[uri]) {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(code, uri)
        }
      } catch (error) {
        console.warn('Failed to add typings:', error)
      }
    })

    instance.onDidChangeModelContent(() => {
      try {
        ata(instance.getValue())
      } catch (error) {
        console.warn('Failed to process ATA:', error)
      }
    })

    ata(instance.getValue())
  }

  return (
    <MonacoEditor
      path={file.name}
      theme="vs-dark"
      height="100%"
      language={file.language}
      value={file.value}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 23,
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
        padding: { top: 16, bottom: 16 },
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        scrollbar: {
          verticalSliderSize: 6,
          horizontalSliderSize: 6,
          vertical: 'auto',
          horizontal: 'auto',
        },
        ...options,
      }}
      onMount={handleEditorMount}
      onChange={onChange}
    />
  )
}
