import React, {useRef, useState,  useEffect} from 'react'
import './style.css';
import data from './data.js';


export default function Bundle() {
  const [audioClip, setAudioClip] = useState(null);
    const pads = data.map(pad => {
        return <Pads key={pad.id} pad={pad}  setAudioClip={setAudioClip}/>
    })




  return (
    <div id='drum-machine' className='inner-container '>
    <p id='display'>{audioClip}</p>
    <section className='pad-bank'>{pads}</section>
    <Control />
    </div>
  )
}



function Pads({ pad, setAudioClip }) {
  const audioRef = useRef(null);
  

  const handleClick = () => playSound();

  const handleKeyDown = (e) => {
    if (e.key.toUpperCase() === pad.keyTrigger) {
      playSound();
      setAudioClip(pad.id);
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setAudioClip(pad.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button className="drum-pad" id={pad.id} onClick={handleClick}>
        {pad.keyTrigger}
        <audio ref={audioRef} src={pad.url} id={pad.keyTrigger} className='clip'/>
      </button>
     
    </div>
  );
}

function Control (){
    return (
        <div className='control-container'>Control</div>
    )
}
