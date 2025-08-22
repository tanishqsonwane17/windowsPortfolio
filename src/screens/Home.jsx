import React, { useState, useRef, } from "react";
import RightMenu from "../components/RightMenu";

const Home = () => {
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleRightClick = (e) => {
    e.preventDefault();

    const menuWidth = menuRef.current?.offsetWidth || 150;
    const menuHeight = menuRef.current?.offsetHeight || 200;

    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setMenu({
      visible: true,
      x,
      y,
    });
  };

  const handleClick = () => {
    if (menu.visible) {
      setMenu({ ...menu, visible: false });
    }
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      className="h-screen w-full bg-slate-400 bg-[url('https://4kwallpapers.com/images/wallpapers/windows-11-stock-3d-5689x2400-10781.png')] bg-cover bg-center relative"
    >
      <div className="flex flex-col gap-5 flex-wrap w-0 h-full p-4">
        <div className="h-12 w-12 bg-yellow-400 rounded-2xl"></div>
      </div>

      {menu.visible && (
        <div
          ref={menuRef}
          style={{ top: menu.y, left: menu.x }}
          className="absolute z-50">
          <RightMenu />
        </div>
      )}
    </div>
  );
};

export default Home;
