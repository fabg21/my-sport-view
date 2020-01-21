export function generateFileList(): FileList {
  return {
    length: 1,
    item: index => this[index],
    0: generateFile()
  };
}

export function generateFile(
  content = [''],
  fileName = 'test.txt',
  options = {}
): File {
  return new File(content, fileName, options);
}

export function generateLocalFile(file?: File): any {
  const { name: id, name, size, type } = file ? file : generateFile();
  return { id, name, size, type };
}
