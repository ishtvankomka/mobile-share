import { React, useEffect, useRef, useState } from 'react';
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
        try {
          navigator.share({
            files,
            title: "Images",
            text: "Beautiful images",
          });
        } catch (err) {
          alert(err)
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      })
  }

  function urltoFile(url, filename, mimeType) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  const [file, setFile] = useState(null)
  useEffect(() => {
    if (file)
      console.log('file: ', file)
  }, [file])
  useEffect(() => {
    if (shareRef)
      toPng(shareRef.current, { cacheBust: false })
        .then((dataUrl) => {
          console.log('share dataUrl: ', dataUrl)
          setFile(dataURLtoFile(dataUrl, 'test'))
        })
  }, [shareRef])

  const handleOnShare2 = () => {
    toPng(shareRef.current, { cacheBust: false })
      .then((dataUrl) => {
        console.log('share dataUrl: ', dataUrl)
        const files = [urltoFile(dataUrl, 'test', 'image/png')]
        console.log('share files: ', files)
        try {
          navigator.share({
            files,
            title: "Images",
            text: "Beautiful images",
          });
        } catch (err) {
          alert(err)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const blob = fetch('https://cdn.glitch.com/f96f78ec-d35d-447b-acf4-86f2b3658491%2Fchuck.png?v=1618311092497').then(r => r.blob())
  const share = async (title, text, blob) => {
    const data = {
      files: [
        new File([blob], 'file.png', {
          type: blob.type,
        }),
      ],
      title: title,
      text: text,
    };
    try {
      await navigator.share(data);
    } catch (err) {
      console.error(err.name, err.message);
      alert(err)
    }
  };

  const handleOnShare3 = () => {
    share('title', 'text', blob)
  }

  const share2 = async (title, text, file) => {
    const data = {
      files: [file],
      title: title,
      text: text,
    };
    try {
      await navigator.share(data);
    } catch (err) {
      console.error(err.name, err.message);
      alert(err)
    }
  };

  const handleOnShare4 = () => {
    share2('title', 'text', file)
  }


  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const handleClick = event => {
      if (navigator.share) {
        const data = {
          files: [file],
          title: 'title',
          text: 'text',
        };
        navigator.share(data).catch((err) => {
          alert('EventListener; ', err)
        });
      } else {
        alert('EventListener navigator.share not found')
      }
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, []);


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
          <div onClick={() => { handleOnShare3() }}>
            <p>Share 3</p>
          </div>
          <div onClick={() => { handleOnShare4() }}>
            <p>Share 4</p>
          </div>
          <button onClick={() => { handleOnShare4() }}>
            <p>Share 5</p>
          </button>
          <button ref={ref} type="button">
            <p>Share 6</p>
          </button>
        </div>
      </div>
    </div>
  );


}

export default App;
