export default function ListHeader() {
  let day = new Date();
  let option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  day = day.toLocaleDateString("en-IL", option);

  return (
    <div className="box" id="heading">
      <h1> {day} </h1>
    </div>
  );
}
