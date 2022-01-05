import * as React from "react";
import { getLabelOps } from '../label-ops';

type AppState = {
	labelOps: string[][]
};

export default class App extends React.Component <{}, AppState> {
	state: AppState = {
		labelOps: getLabelOps()
	};

	removeLabelOp = (i: number): void => {

	};

	addLabelOp = (i: number): void => {

	};

  render() {
  	const { state: { labelOps } } = this;

    return (
      <div>
        <h3>Tim Tam Genderfier 3k</h3>
        <h4>Label pairs</h4>
        {
        	labelOps.map(op => (
        		<p>{op}</p>
        	))
        }
      </div>
    );
  }
}
