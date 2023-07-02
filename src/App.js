import { React, useRef } from 'react';
import './App.scss';
import { toPng } from 'html-to-image';

function App() {
  const shareRef = useRef(null)

  const handleOnDownload = () => {
    toPng(shareRef.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log('download dataUrl: ', dataUrl)
        const link = document.createElement("a")
        link.download = ''
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleOnShare1 = () => {
    toPng(shareRef.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log('share dataUrl: ', dataUrl)
        const files = [dataURLtoFile(dataUrl, 'test')]
        console.log('share files: ', files)
        navigator.share({
          files,
          title: "Images",
          text: "Beautiful images",
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function urltoFile(url, filename, mimeType) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  const handleOnShare2 = () => {
    toPng(shareRef.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log('share dataUrl: ', dataUrl)
        const files = [urltoFile(dataUrl, 'test', 'image/png')]
        console.log('share files: ', files)
        navigator.share({
          files,
          title: "Images",
          text: "Beautiful images",
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <div className='block'>
        <div className='flag' ref={shareRef}>
          <div className='blue flag-color'>

          </div>
          <div className='yellow flag-color'>

          </div>
        </div>
        <div className='control'>
          <div onClick={() => { handleOnDownload() }}>
            <p>Download</p>
          </div>
          <div onClick={() => { handleOnShare1() }}>
            <p>Share 1</p>
          </div>
          <div onClick={() => { handleOnShare2() }}>
            <p>Share 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
