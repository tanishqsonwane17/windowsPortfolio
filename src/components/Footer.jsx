import React, { useEffect, useState } from 'react';
import windows from '../../public/images/windowsLogo.png';
import vscode from '../../public/images/vscode.png';
import chrome from '../../public/images/chrome.png';
import microsoftstore from '../../public/images/microsoftstore.png';
import clock from '../../public/images/clock.png';
import files from '../../public/images/files.png';
import { CiBatteryEmpty, CiBatteryFull } from "react-icons/ci";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CiWifiOn } from "react-icons/ci";
import { Link } from 'react-router';
import BattreyPanel from './BattreyPanel';

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 1, charging: false });
  const [showBatteryPanel, setShowBatteryPanel] = useState(false);

  // ⏰ Live time update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔋 Battery status
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        const updateBattery = () =>
          setBattery({ level: bat.level, charging: bat.charging });

        updateBattery();
        bat.addEventListener("levelchange", updateBattery);
        bat.addEventListener("chargingchange", updateBattery);

        return () => {
          bat.removeEventListener("levelchange", updateBattery);
          bat.removeEventListener("chargingchange", updateBattery);
        };
      });
    }
  }, []);

  return (
    <>
      <div className='h-14 w-full flex justify-end fixed bottom-0 backdrop-blur-3xl'>
        <div className='h-full w-full backdrop-blur-3xl'>
          <ul className='flex w-full justify-end h-full items-center gap-5'>
            <li><img className='bg-transparent h-full w-11' src={windows} alt="" /></li>
            <div className='flex gap-7'>
              <li><img className='bg-transparent cursor-pointer h-full w-7' src={vscode} alt="" /></li>
              <li><img className='bg-transparent cursor-pointer h-full w-7' src={chrome} alt="" /></li>
              <li><img className='bg-transparent cursor-pointer h-full w-7' src={microsoftstore} alt="" /></li>
              <Link to={'/file-explorer'}>
                <li><img className='bg-transparent cursor-pointer h-full w-7' src={files} alt="" /></li>
              </Link>
              <li><img className='bg-transparent cursor-pointer h-full w-7' src={clock} alt="" /></li>
            </div>
          </ul>
        </div>

        <div className='h-full text-white w-[70%] flex items-center justify-end px-4'>
          <div 
            onClick={(e) => { e.stopPropagation(); setShowBatteryPanel(!showBatteryPanel); }}
            className='Battrey h-11 rounded-sm flex justify-center items-center cursor-pointer px-1 mr-6 hover:bg-[#7272721d] gap-2 text-lg'
          >
            <div className='flex flex-col text-xs px-2'>
              <p>ENG</p>
              <p>IN</p>
            </div>
            <CiWifiOn/>
            <HiOutlineSpeakerWave/>
            {battery.charging ? <CiBatteryFull/> : <CiBatteryEmpty/>}
            <span className="text-xs">{Math.round(battery.level * 100)}%</span>
          </div>

          <div className='Date flex flex-col h-8 hover:bg-[#7272721d] cursor-pointer text-[12px] justify-center items-center'>
            <p>{time.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</p>
            <p>{time.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* ⚡ Battery Panel */}
      <BattreyPanel 
        show={showBatteryPanel} 
        onClose={() => setShowBatteryPanel(false)} 
      />
    </>
  );
};

export default Footer;
