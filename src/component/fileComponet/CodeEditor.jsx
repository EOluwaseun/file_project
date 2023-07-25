import { useState } from 'react';

import './CodeEditor.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// eslint-disable-next-line react/prop-types
function CodeEditor({ fileName, data, setData }) {
  // const [data, setData] = useState('\n');

  const codes = {
    html: 'xml',
    php: 'php',
    js: 'javascript',
    jsx: 'jsx',
    txt: 'textile',
    xml: 'xml',
    css: 'css',
    c: 'clike',
    cpp: 'clike',
    java: 'java',
    cs: 'clike',
    py: 'python',
    json: 'javascript',
  };

  const handlekeyDown = (evt) => {
    // eslint-disable-next-line no-undef
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    if (evt.key === 'Tab') {
      value =
        value.substring(0, selStartPos) +
        ' ' +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setData(value);
    }
  };

  return (
    <div className="">
      <div className="code-edit-container">
        <textarea
          className="code-input w-100"
          value={data}
          onKeyDown={handlekeyDown}
          onChange={(e) => setData(e.target.value)}
        />
        <pre className="code-output">
          <SyntaxHighlighter
            // eslint-disable-next-line react/prop-types
            language={codes[fileName.split('.')[1]]}
            showLineNumbers
            style={duotoneLight}
            wrapLines
            startingLineNumber={1}
          >
            {data}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
