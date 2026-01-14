import React, { useEffect, useState } from 'react';
import logo from "../assets/apontilogo.png";

interface SplashProps {
  onFinish: () => void;
}

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img
        src={logo}
        alt="Logomarca Aponti"
        className={`w-1/2 md:w-1/4 ${fadeOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}
      />
    </div>
  );
};

export default Splash;