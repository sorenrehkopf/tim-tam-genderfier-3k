import * as React from "react";
import { getLabelOps } from '../label-ops';
import {
	Icon,
	Input,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Delete } from '@mui/icons-material';

type AppState = {
	labelOps: string[][]
};

export default class App extends React.Component <{}, AppState> {
	state: AppState = {
		labelOps: getLabelOps()
	};

	removeLabelOp = (targetOp: string[]): void => {
		const { state: { labelOps } } = this;

		this.setState({
			labelOps: labelOps.filter((op: string[]): boolean => (
				targetOp !== op
			))
		})
	};

	addLabelOp = (i: number): void => {

	};

  render() {
  	const { removeLabelOp, state: { labelOps } } = this;

    return (
      <div>
        <h3>Tim Tam Genderfier 3k</h3>
        <h4>Label pairs</h4>
        <List>
        {
        	labelOps.map((op: string[]): JSX.Element => (
        		<ListItem key={op[0]}>
        			<ListItemText>{op.join(', ')}</ListItemText>
        			<ListItemIcon onClick={(): void => removeLabelOp(op)}>
        				<Delete></Delete>
        			</ListItemIcon>
        		</ListItem>
        	))
        }
        </List>
        <Input placeholder="New,Genders!" />
      </div>
    );
  }
}
