import {useEffect, useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"};
    case "dataFailed":
      return {...state, status: "error"};
    default:
      throw new Error("Action is unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions#")
      .then((res) => res.json())
      .then((data) => dispatch({type: "dataReceived", payload: data}))
      .catch(() => dispatch({type: "dataFailed"}));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <ul>
          {state.questions.map((el) => {
            return <li key={el.question}>{el.question}</li>;
          })}
        </ul>
      </Main>
    </div>
  );
}

export default App;
