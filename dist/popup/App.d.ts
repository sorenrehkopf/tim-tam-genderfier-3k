import * as React from "react";
declare type AppState = {
    enabled: boolean;
    labelOps: string[][];
    newLabel: string;
    showError: boolean;
};
export default class App extends React.Component<{}, AppState> {
    state: AppState;
    removeLabelOp: (targetOp: string[]) => void;
    addLabelOp: (event: React.FormEvent<HTMLFormElement>) => void;
    handleNewLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleEnabled: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
