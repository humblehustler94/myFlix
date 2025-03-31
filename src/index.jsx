//This file contains the code needed to create a small working React App.
import React from "react";
import { createRoot } from "react-dom/client";
import MainView from "./components/MainView/main-view"; // Import MainView
import "./index.scss"; // Import styles

// Main component renders MainView
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <MainView />
        </div>
    );
};

// Finds the root of your app!
const container = document.querySelector("#root");

if (container) {
    const root = createRoot(container);
    // Render the app in the root DOM element
    root.render(<MyFlixApplication />);
} else {
    console.error("Root element not found. Make sure index.html has a <div id='root'></div>.");
}


