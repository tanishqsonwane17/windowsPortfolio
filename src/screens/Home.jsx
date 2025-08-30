import React, { useState, useRef } from "react";
import RightMenu from "../components/RightMenu";

const Home = () => {
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [folders, setFolders] = useState([]);
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

    setMenu({ visible: true, x, y });
  };

  const handleClick = () => {
    if (menu.visible) {
      setMenu({ ...menu, visible: false });
    }
  };

  // ✅ New Folder create
  const handleNewFolder = () => {
    setFolders([
      ...folders,
      {
        id: Date.now(),
        name: `New Folder`,
        isEditing: true,
      },
    ]);
    setMenu({ ...menu, visible: false });
  };

  const handleNameChange = (id, value) => {
    setFolders(
      folders.map((f) =>
        f.id === id ? { ...f, name: value } : f
      )
    );
  };

  const handleFinishEditing = (id) => {
    setFolders(
      folders.map((f) =>
        f.id === id ? { ...f, isEditing: false } : f
      )
    );
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      className="h-screen w-full bg-slate-400 bg-[url('https://4kwallpapers.com/images/wallpapers/windows-11-stock-3d-5689x2400-10781.png')] bg-cover bg-center relative"
    >
   <div className="flex flex-wrap flex-col content-start h-full p-4 gap-6">
  {/* Fixed folders */}
  <div className="flex flex-col items-center w-20">

    <div className="text-4xl">📁</div>
    <p className="mt-1 text-xs text-white text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
      Projects
    </p>
  </div>

  <div className="flex flex-col items-center w-20">
    <div className="text-4xl">📁</div>
    <p className="mt-1 text-xs text-white text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
      Skills
    </p>
  </div>

  {/* Dynamic folders */}
  {folders.map((folder) => (
    <div key={folder.id} className="flex flex-col items-center w-20">
      <div className="text-4xl cursor-pointer">📁</div>
      {folder.isEditing ? (
        <input
          autoFocus
          value={folder.name}
          onChange={(e) => handleNameChange(folder.id, e.target.value)}
          onBlur={() => handleFinishEditing(folder.id)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleFinishEditing(folder.id)
          }
          className="mt-1 text-sm w-full text-center px-1 text-white rounded outline-none border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
        />
      ) : (
        <p className="mt-1 text-xs text-white text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {folder.name}
        </p>
      )}
    </div>
    ))}
      </div>
      {menu.visible && (
        <div
          ref={menuRef}
          style={{ top: menu.y, left: menu.x }}
          className="absolute z-50" >
          <RightMenu onNewFolder={handleNewFolder} />
        </div>
      )}
    </div>
  );
};

export default Home;
