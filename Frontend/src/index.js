import React from "react";
import { render, hydrate } from "react-dom";
import App from "./App";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
hydrate(<App />, document.getElementById("root"));

export { default as Config } from "./../config/default";
