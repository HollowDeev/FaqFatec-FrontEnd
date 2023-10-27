import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import P from 'prop-types' 

export default function EditorTexto({textoInicial = '', onChange}) {
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        initialValue={textoInicial}
        onChange={() => onChange(editorRef.current.getContent())}
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
      
    </>
  );
}

EditorTexto.propTypes = {
  textoInicial: P.string,
  onChange: P.func
}