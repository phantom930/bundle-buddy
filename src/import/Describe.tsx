import React, { Component } from "react";
import { readFileAsText } from "./file_reader";
import { Link } from "react-router-dom";
import {ImportHistory, ProcessedHistory} from "../types";
// noopener noreferrer

class DescribeImport extends Component<{history: ImportHistory}> {
  existingImportInput: React.RefObject<HTMLInputElement & {files: FileList}> ;

  constructor(props: {history: ImportHistory}) {
    super(props);
    this.existingImportInput = React.createRef();
  }

async onExistingImportInput() {
    const file = this.existingImportInput.current?.files[0];
    if (file == null) {
      return;
    }

    const contents = await readFileAsText(file);
    const previousState = JSON.parse(contents);

    ((this.props.history as unknown) as ProcessedHistory).push(
      "/bundle",
      previousState
    )
  }

  state: never;

  render() {
    const selected = window.location.pathname;

    return (
      <div>
        <h1>Analyze</h1>
        <h5>What bundler are you using?</h5>
        <div className="flex">
          <Link
            to="/webpack"
            aria-label="webpack project import"
            className="no-link-underline"
          >
            <button
              className={`${
                selected === "webpack" ? "selected" : ""
              } type-button  rollup-import`}
            >
              <img width="35px" height="36px" className="rollup-logo" src="/img/webpack_logo.png" />
              Webpack / Create React App
            </button>
          </Link>
          <Link
            to="/rollup"
            aria-label="rollup project import"
            className="no-link-underline"
          >
            <button
              className={`${
                selected === "rollup" ? "selected" : ""
              } type-button rollup-import`}
            >
              <img 
                width="34px"
                height="36px"
                src="/img/rollup_logo.png" className="rollup-logo" /> Rollup
            </button>
          </Link>
        </div>
        <div className="flex">
          <button tabIndex={-1}>Import existing project
            <input
                type="file"
                ref={this.existingImportInput}
                accept=".json"
                onInput={async () => await this.onExistingImportInput()}
              />
          </button>
        </div>
      </div>
    );
  }
}

export default DescribeImport;
