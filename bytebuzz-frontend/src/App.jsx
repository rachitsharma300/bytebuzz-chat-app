import toast from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div>
      <h1>This is Main page.</h1>
      <button
        onClick={() => {
          toast.success("This is a success message!");
        }}
      >
        Toaste test
      </button>
    </div>
  );
}

export default App;
