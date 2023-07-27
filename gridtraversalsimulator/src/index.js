import React from "react";
import ReactDOM from "react-dom";
import MainStructure from "./components/PageFormat.jsx";

export default function App() {
    return (
        <div>
            <MainStructure />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));