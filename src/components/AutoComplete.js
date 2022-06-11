import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./AutoComplete.css";
import getServerData from "../MockData";

function useDebounce() {
  let id;

  return (callback, delay) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      callback();
    }, delay);
  };
}

const AutoComplete = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");
  const list = useRef();
  const debounce = useDebounce();

  const changeHandler = (event) => {
    setInputValue("");
    debounce(async () => {
      const newData = await getServerData(event.target.value);
      setData(newData);
    }, 500);
    setInputValue(event.target.value);
    inputValue.length <= 1
      ? (list.current.style.display = "none")
      : (list.current.style.display = "block");
  };

  const clickHandler = (event) => {
    setInputValue(event.target.innerHTML);
    list.current.style.display = "none";
  };

  return (
    <Card className="autocomplete-container">
      <input
        id="input"
        onChange={changeHandler}
        className="autocomplete__input"
        type="text"
        placeholder="Plese type something here"
        value={inputValue}
      ></input>
      <ul id="list" ref={list}>
        {data &&
          data.map((dataItem) => (
            <li key={dataItem} onClick={clickHandler}>
              {dataItem}
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default AutoComplete;
