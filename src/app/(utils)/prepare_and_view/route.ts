
const prepare_and_view = async (doc: Buffer) => {
  
                                    const byteArray = new Uint8Array(doc);
                                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                                    const blobUrl = URL.createObjectURL(blob);
                                    window.open(blobUrl, '_blank'); //_black opens in a new tab
}
export default prepare_and_view;