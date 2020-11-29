import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import ListContainer from "./components/Lists/ListContainer";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "nice",
    type: "success",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !priority) {
      !name
        ? showAlert(true, "please, enter item name", "danger")
        : showAlert(true, "please, enter priority", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name, lastChanged: getCurrentTime() };
          }
          return item;
        })
      );
      showAlert(true, "value changed", "success");
      setIsEditing(false);
      setName("");
      setPriority("");
      setEditID(null);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        itemPriority: priority,
        lastChanged: getCurrentTime(),
      };

      const sortedList = [...list, newItem].sort((a, b) => a.title.localeCompare(b.title)).sort(
        (a, b) => a.itemPriority - b.itemPriority
      );
      
      setList(sortedList);
      showAlert(true, "item added to the list", "success");
      setName("");
      setPriority("");
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const curTime =
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      "   " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return curTime;
  };
  const clearList = () => {
    showAlert(true, "all items cleared", "danger");
    setList([]);
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const deleteItem = (id) => {
    showAlert(true, "success deleted item", "success");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const editItem = (id) => {
    const editingItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(editingItem.title);
    setPriority(editingItem.itemPriority);
    setEditID(id);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show ? (
          <Alert {...alert} removeAlert={showAlert} list={list} />
        ) : (
          <p className="alert"></p>
        )}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e. g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="grocery"
            placeholder="priority from 0 to 5"
            type="number"
            value={priority}
            onChange={(e) => {
              if (e.target.value >= 0 && e.target.value <= 5) {
                setPriority(e.target.value);
              }
            }}
          ></input>
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <ListContainer
            items={list}
            deleteItem={deleteItem}
            editItem={editItem}
            setEditID={setEditID}
          />

          <button
            disabled={isEditing}
            className="clear-btn"
            onClick={clearList}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
