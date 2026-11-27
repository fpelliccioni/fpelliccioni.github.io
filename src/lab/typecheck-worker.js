import ts from 'typescript';

const options = {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2020,
  lib: ['lib.es2020.d.ts'],
  types: [],
};

function checkTypes(source, declarations) {
  const editorPath = '/editor.ts';
  const libraryPath = '/tao-js.d.ts';
  // Keep the editor's local definitions separate from the library's globals.
  const files = {
    ...__LAB_TYPESCRIPT_LIBRARIES__,
    [editorPath]: source + '\nexport {};\n',
    [libraryPath]: declarations,
  };
  const readFile = (name) => Object.hasOwn(files, name) ? files[name] : undefined;
  const host = {
    getSourceFile(name, languageVersion) {
      const content = readFile(name);
      if (content !== undefined) return ts.createSourceFile(name, content, languageVersion);
    },
    getDefaultLibFileName: () => '/lib.es2020.d.ts',
    getCurrentDirectory: () => '/',
    getCanonicalFileName: (name) => name,
    getNewLine: () => '\n',
    useCaseSensitiveFileNames: () => true,
    fileExists: (name) => readFile(name) !== undefined,
    readFile,
    writeFile() {},
  };
  const program = ts.createProgram([editorPath, libraryPath], options, host);
  return ts.getPreEmitDiagnostics(program)
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
    .map((diagnostic) => {
      const inEditor = diagnostic.file?.fileName === editorPath && diagnostic.start !== undefined;
      const start = inEditor ? Math.min(diagnostic.start, source.length) : undefined;
      const position = inEditor && diagnostic.file.getLineAndCharacterOfPosition(start);
      return {
        code: diagnostic.code,
        message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        start,
        length: diagnostic.length,
        line: position ? position.line + 1 : undefined,
        column: position ? position.character + 1 : undefined,
      };
    });
}

self.onmessage = ({ data }) => {
  try {
    self.postMessage({ diagnostics: checkTypes(data.source, data.declarations) });
  } catch (error) {
    self.postMessage({ error: String(error.message || error) });
  }
};
