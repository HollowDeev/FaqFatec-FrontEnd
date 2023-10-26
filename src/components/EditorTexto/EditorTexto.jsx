import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorTexto() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          widht: 500,
          menubar: false,
          plugins: 'link lists',
          toolbar: ' undo redo | formatselect | ' +
          'bold italic backcolor link  | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        
          link_context_toolbar: true,
          lists_indent_on_tab: false,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}