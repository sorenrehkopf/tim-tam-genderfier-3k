import * as React from "react";
declare type AppState = {
    labelOps: string[][];
};
export default class App extends React.Component<{}, AppState> {
    state: AppState;
    removeLabelOp: (targetOp: string[]) => void;
    addLabelOp: (i: number) => void;
    render(): JSX.Element;
}
export {};
