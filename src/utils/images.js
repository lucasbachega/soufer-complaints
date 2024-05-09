export const getBlob = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    let binary = "";
    reader.onload = () => {
      binary = reader.result;
      res(binary);
    };
    reader.onerror = () => {
      rej("file reading has failed");
    };
    reader.readAsArrayBuffer(file);
  });
};

export const getFileUrl = (occurrenceId, filename) => {
  return `${process.env.REACT_APP_API_URL}/complaints/${occurrenceId}/file/${filename}`;
};
