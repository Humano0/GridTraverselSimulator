import React from "react";
import ReactDOM from "react-dom";
import { SettingsBar } from "./components/SettingsBar";

export default function App() {
    return (
        <div>
            <SettingsBar />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));