/**
 * @format
 */

import "react-native";
import React from "react";

// Note: import explicitly to use the types shipped with jest.
import {it} from "@jest/globals";
import App from "../src/App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  renderer.create(<App />);
});
