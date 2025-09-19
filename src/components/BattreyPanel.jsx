import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BattreyPanel = ({ show, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (onClose) onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3 }}
          ref={panelRef}
          className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 rounded-t-2xl shadow-lg z-50"
        >
          <h2 className="text-lg font-semibold">🔋 Battery Panel</h2>
          <p>Status aur details yahan aayengi...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BattreyPanel;
