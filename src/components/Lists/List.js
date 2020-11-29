import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({
  title,
  id,
  itemPriority,
  lastChanged,
  deleteItem,
  editItem,
}) => {
  return (
    <article key={id} className="grocery-item">
      <p className="title">{title}</p>
      <p className="title">{itemPriority}</p>
      <p className="title">{lastChanged}</p>

      <div className="btn-container">
        <button type="button" className="edit-btn">
          <FaEdit
            onClick={() => {
              editItem(id);
            }}
          />
        </button>
        <button onClick={() => deleteItem(id)} className="delete-btn">
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
