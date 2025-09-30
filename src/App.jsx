import React, { useEffect, useRef, useState } from "react";
import walkingperson from "./assets/walking-person.gif";
import giphy from "./assets/giphy.gif";
import cloudim from "./assets/cloudim.webp";
import plane from "./assets/plane.png";
import autumntree3 from "./assets/autumn-tree3.png";
import autumntree5 from "./assets/autumn-tree5.png";
import birdfly from "./assets/bird-fly.gif";
import { gsap } from "gsap";
import bgautumnhill from "./assets/autumnhill3.jpg"
import cow from "./assets/cow.png"

function App() {
  const [timer, settimer] = useState(25 * 60)
  const [istimerrunning, setIstimerrunning] = useState(false)

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 3,
  });

  const planeRef = useRef(null);
  const autumntree3ref = useRef(null)
  const autumntree5ref = useRef(null)
  const cloudref = useRef(null)
  const birdflyref = useRef(null)
  const intervalRef = useRef(null)
  const circleref = useRef(null)
  const tl1 = useRef(null)

  const handleStart = () => {
    if (intervalRef.current) return
    if (tl1.current) {
      tl1.current.resume()
    }
    setIstimerrunning(true)

    if (timer > 0) {
      intervalRef.current = setInterval(() =>
        settimer((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            intervalRef.current = null;
            return 0;
          }
          return t - 1
        }), 1000)
    }
  }

  const handleformat = () => {
    if (tl1.current) {
      tl1.current.restart()
      tl1.current.pause()
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIstimerrunning(false);
    settimer(25 * 60);
  }

  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    return `${minute}:${second.toString().padStart(2, "0")}`
  }

  // Update circle animation when timer changes
  const updateCircleAnimation = () => {
    if (tl1.current) {
      tl1.current.kill();
    }
    
    tl1.current = gsap.fromTo(
      circleref.current,
      {
        rotate: "0deg",
      },
      {
        rotate: "360deg",
        duration: timer, // Use current timer value
        repeat: -1,
        ease: "linear",
        paused: true
      }
    )
  }

  useEffect(() => {
    gsap.to(
      cloudref.current,
      {
        x: -10,
        yoyo: true,
        duration: 1,
        repeat: -1
      }
    )

    gsap.to(
      birdflyref.current,
      {
        x: "-110vw",
        duration: 10,
        repeat: -1,
        opacity: 1,
        repeatDelay: 5
      }
    )

    gsap.fromTo(
      planeRef.current,
      { x: "-100%" },
      {
        x: "110vw",
        repeat: -1,
        duration: 20,
        repeatDelay: 3,
        delay: 5,
        ease: "power1.inOut"
      }
    );

    tl.fromTo(
      autumntree3ref.current,
      {
        x: "110vw"
      },
      {
        x: "-110vw",
        duration: 10,
        ease: "power1.inOut",
        delay: 5
      }
    ).fromTo(
      autumntree5ref.current,
      {
        x: "110vw"
      },
      {
        x: "-200vw",
        duration: 10,
        ease: "power1.inOut",
        delay: 5
      }
    )

    // Initialize circle animation
    updateCircleAnimation();
  }, []);

  // Update circle animation when timer changes
  useEffect(() => {
    if (!istimerrunning) {
      updateCircleAnimation();
    }
  }, [timer, istimerrunning]);

  const handlePause = () => {
    if (tl1.current) {
      tl1.current.pause()
    }
    console.log("pause")
    clearInterval(intervalRef.current)
    intervalRef.current = null;
    setIstimerrunning(false)
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full flex flex-col items-center justify-end relative overflow-hidden bg-linear-to-t from-orange-50 to-orange-400">

        {/* bird fly */}
        <img ref={birdflyref} src={birdfly} className=" z-10 w-[200px] h-[100px] absolute right-0 top-15" alt="birdfly" />

        {/* Plane */}
        <div className="flex absolute top-[150px] z-10 left-0" ref={planeRef}>
          <img src={plane} className="w-[60px]" alt="plane" />
        </div>

        {/*cow eating */}
        <img src={cow} className="w-[30px] left-60 object-cover h-[30px] z-10 absolute bottom-30" alt="" />
        <img src={bgautumnhill} className="w-full object-cover h-screen absolute bottom-10" alt="" />

        {/* Clouds */}
        <div className="flex absolute top-30 z-20 opacity-75" ref={cloudref}>
          <img src={cloudim} className="w-[250px]" alt="cloud" />
          <img src={cloudim} className="w-[250px]" alt="cloud" />
        </div>

        {/* Walking Person */}
        <img className="h-[150px] z-40 w-[100px]" src={walkingperson} alt="walking" />

        <img ref={autumntree3ref} src={autumntree3} alt="autumntree2" className="w-[300px] h-[300px] absolute bottom-0 z-20 right-0" />

        <div ref={autumntree5ref} className="flex absolute right-0 z-20">
          <img src={autumntree5} className="w-[300px] h-[300px]" alt="" />
          <img src={autumntree5} className="w-[300px] h-[300px]" alt="" />
        </div>

        {/* Ground */}
        <img src={giphy} className="w-full h-[100px] absolute bottom-0 z-30" alt="giphy" />

        <div className="flex flex-col justify-center items-center w-[400px] z-40 h-[450px] sm:h-[500px]  absolute sm:right-10 sm:bottom-20 rounded-3xl shadow-2xl backdrop-blur-xs sm:backdrop-blur-lg  bg-white/10 sm:border sm:border-white/20 overflow-hidden">

          <h2 className="text-xl mb-2 -mt-20 sm:-mt-10">DIFFICULTY LEVEL</h2>
          <div className="z-40">
            <ul className="flex gap-4 mb-2 text-xs  px-4 py-2">
              <li className="cursor-pointer hover:text-orange-300 transition-colors" onClick={() => settimer(25*60)}>EASY</li>
              <li className="cursor-pointer hover:text-orange-300 transition-colors" onClick={() => settimer(45*60)}>MEDIUM</li>
              <li className="cursor-pointer hover:text-orange-300 transition-colors" onClick={() =>  settimer(60*60)}>HARD</li>
            </ul>
          </div>

          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-amber-600/10 animate-pulse-slow"></div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-2 h-2 bg-white/30 rounded-full top-1/4 left-1/4 animate-float"></div>
            <div className="absolute w-1 h-1 bg-amber-300/40 rounded-full top-1/3 right-1/3 animate-float-delayed"></div>
            <div className="absolute w-1.5 h-1.5 bg-orange-400/30 rounded-full bottom-1/4 left-1/2 animate-float-slow"></div>
          </div>

          <div className="relative w-[200px] h-[200px] flex flex-col items-center justify-center overflow-hidden">
            {/* Timer Display */}
            <div className="relative z-10 text-center">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">{formatTime(timer)}</h1>
              <p className="text-orange-400 text-sm font-medium tracking-wider">STUDY SESSION</p>
            </div>

            {/* Progress Circle */}
            <div className="absolute rounded-full w-[180px] h-[180px] border-4 border-white/20 backdrop-blur-sm">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-300 border-r-amber-300 animate-spin-slow"></div>

              {/* Progress indicator dot */}
              <div ref={circleref} className="w-[180px] h-[180px] relative">
                <div className="w-[15px] h-[15px] bg-gradient-to-br from-orange-300 to-amber-400 rounded-full absolute top-0 left-0 bottom-0 right-0 m-auto translate-x-[-65px] translate-y-[65px] shadow-lg ring-2 ring-white/50"></div>
              </div>

              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400/10 to-transparent backdrop-blur-sm"></div>
            </div>

            {/* Pulsing effect */}
            <div className={`absolute rounded-full w-[200px] h-[200px] border-2 border-orange-400/30 ${istimerrunning ? 'animate-ping-slow' : ''}`}></div>
          </div>

          {/* Control Buttons */}
          <div className="mt-12 flex gap-2 z-10 absolute bottom-10">
            <button
              onClick={handleStart}
              disabled={istimerrunning}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed font-semibold backdrop-blur-sm border border-white/20"
            >
              <span className="text-xs flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                START
              </span>
            </button>

            <button
              onClick={handlePause}
              disabled={!istimerrunning}
              className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed font-semibold backdrop-blur-sm border border-white/20"
            >
              <span className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
                PAUSE
              </span>
            </button>

            <button
              onClick={handleformat}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold backdrop-blur-sm border border-white/20"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
                RESET
              </span>
            </button>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2 text-orange-200 text-sm">
            <div className={`w-2 h-2 rounded-full ${istimerrunning ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
            <span className="text-white">{istimerrunning ? 'ACTIVE' : 'READY'}</span>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;