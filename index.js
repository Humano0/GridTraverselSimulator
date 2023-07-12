import React from "react";

import { createRoot } from "react-dom/client";
import { Settingsbar } from "./components/settingsbar";


const domNode = document.createElement('div');
const domRoot = createRoot(domNode);
domRoot.render(<Settingsbar />);
