import { React, useRef } from 'react';
import './App.scss';
import { Share } from './components/Share/Share';

function App() {
  const shareRef = useRef(null)

  return (
    <div className="App">
      <div className='block'>
        <div className='flag' ref={shareRef}>
          <div className='blue flag-color'></div>
          <div className='yellow flag-color'></div>
        </div>
        <div className='control'>
          <Share
            shareRef={shareRef}
            title={'Share this'}
            filename={'shared'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;