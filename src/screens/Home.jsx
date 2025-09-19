import React, { useState, useRef } from "react";
import RightMenu from "../components/RightMenu";
import { useNavigate } from "react-router";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const Home = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [folders, setFolders] = useState([
    { id: "projects", name: "Projects", fixed: true },
    { id: "skills", name: "Skills", fixed: true },
  ]);
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
        id: Date.now().toString(),
        name: `New Folder`,
        isEditing: true,
        fixed: false,
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

  // ✅ Handle drag reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newFolders = Array.from(folders);
    const [moved] = newFolders.splice(result.source.index, 1);
    newFolders.splice(result.destination.index, 0, moved);
    setFolders(newFolders);
  };

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClick}
      className="h-screen w-full bg-slate-400 bg-[url('https://4kwallpapers.com/images/wallpapers/windows-11-stock-3d-5689x2400-10781.png')] bg-cover bg-center relative"
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="desktop" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-wrap gap-6 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {folders.map((folder, index) => (
                <Draggable
                  key={folder.id}
                  draggableId={folder.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-col items-center w-20 cursor-pointer"
                      onDoubleClick={() =>
                        folder.id === "projects" &&
                        navigate("/projects")
                      }
                    >
                      <div className="text-4xl">📁</div>
                      {folder.isEditing ? (
                        <input
                          autoFocus
                          value={folder.name}
                          onChange={(e) =>
                            handleNameChange(folder.id, e.target.value)
                          }
                          onBlur={() => handleFinishEditing(folder.id)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleFinishEditing(folder.id)
                          }
                          className="mt-1 text-sm w-full text-center px-1 text-white rounded outline-none border border-gray-300"
                        />
                      ) : (
                        <p className="mt-1 text-xs text-white text-center w-full overflow-hidden text-ellipsis">
                          {folder.name}
                        </p>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Right-click menu */}
      {menu.visible && (
        <div
          ref={menuRef}
          style={{ top: menu.y, left: menu.x }}
          className="absolute z-50"
        >
          <RightMenu onNewFolder={handleNewFolder} />
        </div>
      )}
    </div>
  );
};

export default Home;
