import Editor from '@monaco-editor/react'

interface TOMLEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  height?: string
  readOnly?: boolean
}

export default function TOMLEditor({
  value,
  onChange,
  height = '600px',
  readOnly = false,
}: TOMLEditorProps) {
  return (
    <Editor
      height={height}
      defaultLanguage="toml"
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

