import * as React from "react";
import { getLabelOps } from '../label-ops';
import {
	Divider,
	Icon,
	Input,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography
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

	addLabelOp = (): boolean => {
		alert('yeah!!');

		return false;
	};

  render() {
  	const { addLabelOp, removeLabelOp, state: { labelOps } } = this;

    return (
      <div>
        <Typography variant="h4">Tim Tam Genderfier 3k</Typography>
        <Divider />
        <Typography variant="h5">Label pairs</Typography>
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
        <form onSubmit={addLabelOp}>
        	<Input placeholder="New,Genders!" />
        </form>
      </div>
    );
  }
}
