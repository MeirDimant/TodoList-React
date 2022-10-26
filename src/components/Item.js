import { deleteItem, handleItemCheck } from "../services/firebase";

export default function Item({ item, setLoading }) {
  let handleClick = (e) => {
    e.preventDefault();
    deleteItem(item.id);
    setLoading(true);
  };

  let handleChangeChk = (e) => {
    handleItemCheck(item.id, e.target.checked);
  };

  return (
    <div className="item">
      <input
        type="checkbox"
        defaultChecked={item.data.checked}
        onChange={handleChangeChk}
      />
      <p>{item.data.title}</p>
      <span className="waste" onClick={handleClick}>
        &#128465;
      </span>
    </div>
  );
}
