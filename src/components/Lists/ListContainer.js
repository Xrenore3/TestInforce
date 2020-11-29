import React from "react";
import List from "./List";

const ListContainer = ({ items, deleteItem, editItem }) => {
  return (
    <>
      <p className="header">name</p>
      <p className="header">priority</p>
      <p className="header">last change</p>
      <div className="grocery-list">
        {items.map((item) => {
          const { id, title, itemPriority, lastChanged } = item;

          return (
            <List
              key={id}
              id={id}
              title={title}
              itemPriority={itemPriority}
              deleteItem={deleteItem}
              editItem={editItem}
              lastChanged={lastChanged}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListContainer;
