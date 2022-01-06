import * as React from "react";
declare type AppState = {
    labelOps: string[][];
    newLabel: string;
};
export default class App extends React.Component<{}, AppState> {
    state: AppState;
    removeLabelOp: (targetOp: string[]) => void;
    addLabelOp: (event: React.FormEvent<HTMLFormElement>) => void;
    handleNewLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
