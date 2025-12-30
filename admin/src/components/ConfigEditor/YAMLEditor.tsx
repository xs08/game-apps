import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

interface YAMLEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  height?: string
  readOnly?: boolean
}

export default function YAMLEditor({
  value,
  onChange,
  height = '600px',
  readOnly = false,
}: YAMLEditorProps) {
  return (
    <Editor
      height={height}
      defaultLanguage="yaml"
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  )
}

