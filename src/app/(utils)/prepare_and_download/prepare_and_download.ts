
const prepare_and_download = async (doc: Buffer, fileName: string) => {
  

  const byteArray = new Uint8Array(doc);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = fileName || 'document.pdf';
  downloadLink.click();
  URL.revokeObjectURL(url);
}
export default prepare_and_download;