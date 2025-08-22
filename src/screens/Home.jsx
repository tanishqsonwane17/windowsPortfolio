import React, { useState } from "react";
import RightMenu from "../components/RightMenu";

const Home = () => {
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault(); // default browser ka context menu hatao
    setMenu({
      visible: true,
      x: e.clientX, // mouse X position
      y: e.clientY, // mouse Y position
    });
  };

  const handleClick = () => {
    // normal left click pe band kar dena
    if (menu.visible) {
      setMenu({ ...menu, visible: false });
    }
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      className="h-screen w-full bg-slate-400 bg-[url('https://cdn.wallpaperhub.app/cloudcache/2/b/c/3/7/5/2bc375a59ea8bb65dbd995b77ab56cbc3107a651.jpg')] bg-cover bg-center relative"
    >
      <div className="flex flex-col gap-5 flex-wrap w-0 h-full p-4">
        <div className="h-12 w-12 bg-yellow-400 rounded-2xl"></div>
        <div className="h-12 w-12 bg-yellow-400 rounded-2xl"></div>
      </div>

      {menu.visible && (
        <div
          style={{ top: menu.y, left: menu.x }}
          className="absolute"
        >
          <RightMenu />
        </div>
      )}
    </div>
  );
};

export default Home;
