import { useEffect, useState } from "react";
import {
  streamItems,
  authenticateAnonymously,
  setUserListRef,
} from "../services/firebase";
import AddItem from "./AddItem";
import Item from "./Item";
import Loading from "./Loading";

export default function ListBody() {
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = async () => {
      setLoading(true);
      let { user } = await authenticateAnonymously();
      setUserId(user.uid);
      setUserListRef(user.uid);
    };

    auth();
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = streamItems(
        (snapshot) => {
          setLoading(true);
          let updateTodos = snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }));
          setTodoList(updateTodos);
          setLoading(false);
        },
        (error) => console.log(error)
      );

      return unsubscribe;
    }
  }, [userId]);

  return (
    <div>
      <div className="box">
        {todoList.map((item) => (
          <Item key={item.id} item={item} setLoading={setLoading} />
        ))}
        <AddItem setLoading={setLoading} />
      </div>
      {loading && <Loading />}
    </div>
  );
}
