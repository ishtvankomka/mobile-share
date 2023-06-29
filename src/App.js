import { React, useRef } from 'react';
import './App.scss';
import { toPng } from 'html-to-image';

function App() {
  const shareRef = useRef(null)

  const handleOnDownload = () => {
    toPng(shareRef.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log('download: ', dataUrl)
        const link = document.createElement("a")
        link.download = ''
        link.href = dataUrl
        link.click()
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
          <div onClick={() => { handleOnDownload() }}>
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
