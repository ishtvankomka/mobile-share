import { React, useEffect, useRef, useState } from 'react';
import './App.scss';
import { toPng } from 'html-to-image';

function App() {
  const shareRef = useRef(null)

  const [pngUrl, setPngUrl] = useState(null)
  useEffect(() => {
    if (shareRef)
      toPng(shareRef.current, { cacheBust: false })
        .then((dataUrl) => {
          setPngUrl(dataUrl)
        })
  }, [shareRef])

  const [pngBlob, setPngBlob] = useState(null)
  useEffect(() => {
    if (pngUrl?.length) {
      var byteString;
      if (pngUrl.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(pngUrl.split(',')[1]);
      else
        byteString = unescape(pngUrl.split(',')[1]);
      var mimeString = pngUrl.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      setPngBlob(new Blob([ia], { type: mimeString }))
    }
  }, [pngUrl])

  const [pngFile, setPngFile] = useState(null)
  useEffect(() => {
    if (pngBlob)
      setPngFile(
        new File([pngBlob], "file.png", {
          type: "image/png",
        })
      )
  }, [pngBlob])

  const handleOnShare = async (event) => {
    if (pngFile) {
      const data = {
        files: [pngFile],
        title: "title",
        text: "text",
      };
      try {
        await navigator.share(data);
      } catch (err) {
        console.error(err.name, err.message);
        alert(err)
      }
    }
  }


  return (
    <div className="App">
      <div className='block'>
        <div className='flag' ref={shareRef}>
          <div className='blue flag-color'></div>
          <div className='yellow flag-color'></div>
        </div>
        <div className='control'>
          <button onClick={(e) => { handleOnShare(e) }}>
            <p>Share</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
