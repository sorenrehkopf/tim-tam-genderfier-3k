import * as React from "react";
import getLabelOps from '../utils/get-label-ops';
import {
	Button,
	Divider,
	Icon,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

type AppState = {
	labelOps: string[][],
	newLabel: string
};

export default class App extends React.Component <{}, AppState> {
	state: AppState = {
		labelOps: getLabelOps(),
		newLabel: ''
	};

	removeLabelOp = (targetOp: string[]): void => {
		const { state: { labelOps } } = this;

		this.setState({
			labelOps: labelOps.filter((op: string[]): boolean => (
				targetOp !== op
			))
		})
	};

	addLabelOp = (event: React.FormEvent<HTMLFormElement>): void => {
		const { state: { newLabel, labelOps } } = this;

		event.preventDefault();

		if (/,/g.test(newLabel)) {
			const [op1, op2] = newLabel.split(',');
			const newLabelOps = [...labelOps, [op1, op2]];

			this.setState({
				labelOps: newLabelOps,
				newLabel: ''
			});
		}
	};

	handleNewLabelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			newLabel: event.target.value
		});
	};

  render() {
  	const { addLabelOp, handleNewLabelChange, removeLabelOp, state: { labelOps, newLabel } } = this;

    return (
      <div>
        <Typography variant="h5" mb={2}>Tim Tam Genderfier 3k</Typography>
        <Typography variant="subtitle1">Spectrum Labels</Typography>
        <Divider/>

        <List>
        {
        	labelOps.map((op: string[]): JSX.Element => (
        		<ListItem key={op[0]}>
        			<ListItemText>{op.join(', ')}</ListItemText>
        			<ListItemIcon onClick={(): void => removeLabelOp(op)}>
        				<Delete/>
        			</ListItemIcon>
        		</ListItem>
        	))
        }
        </List>

        <Typography mt={1} variant="subtitle1">Add New</Typography>
        <Divider/>

        <form
        	onSubmit={addLabelOp}
      		style={{ padding: "0px 30px 0px 16px", margin: "16px 0px"}}
        >
      		<Input
      			fullWidth={true}
      			placeholder="New,Genders!"
      			onChange={handleNewLabelChange}
      			value={newLabel}
      			endAdornment={
      				<InputAdornment position="end">
      					<Button type="submit">
      						<Add/>
      					</Button>
      				</InputAdornment>
      				}
      			/>
        </form>
      </div>
    );
  }
}
