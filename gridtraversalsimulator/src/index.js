import React from "react";
import ReactDOM from "react-dom";
import SettingStructure from "./components/SettingStructure.jsx";

export default function App() {
    return (
        <div>
            <SettingStructure />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));