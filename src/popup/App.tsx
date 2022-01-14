import * as React from "react";
import { inputErrorText, labelOpsStorageKey, enabledStorageKey } from '../consts';
import { getEnabled, getLabelOps } from '../utils/local-storage-getters';
import {
	Button,
	Divider,
  FormControlLabel,
  FormHelperText,
	Icon,
	Input,
	InputAdornment,
	List,
	ListItem,
	IconButton,
	ListItemText,
  Switch,
	Typography
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export type AppState = {
  enabled: boolean,
	labelOps: string[][],
	newLabel: string,
  showError: boolean
};

export default class App extends React.Component <{}, AppState> {
	state: AppState = {
    enabled: false,
		labelOps: [],
		newLabel: '',
    showError: false
	};

  async componentDidMount() {
    const enabled = await getEnabled();
    const labelOps = await getLabelOps();

    this.setState({ enabled, labelOps });
  }

	addLabelOp = (event: React.FormEvent<HTMLFormElement>): void => {
		const { state: { newLabel, labelOps } } = this;

		event.preventDefault();

		if (newLabel.length && /,/g.test(newLabel)) {
			const [op1, op2] = newLabel.replace(/\s*,\s*/, ',').split(',');
			const newLabelOps = [...labelOps, [op1, op2]];

			this.setState({
				labelOps: newLabelOps,
				newLabel: ''
			});

      chrome.storage.sync.set({
        [labelOpsStorageKey]: newLabelOps
      });
		} else {
      this.setState({ showError: true });
    }
	};

	handleNewLabelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			newLabel: event.target.value,
      showError: false
		});
	};

	removeLabelOp = (targetOp: string[]): void => {
		const { state: { labelOps } } = this;
    const newLabelOps: string[][] = labelOps.filter((op: string[]): boolean => (
      targetOp !== op
    ))

		this.setState({
			labelOps: newLabelOps
		});

    chrome.storage.sync.set({
      [labelOpsStorageKey]: newLabelOps
    });
	};

  toggleEnabled = (event?: React.ChangeEvent<HTMLInputElement>): void => {
    const { state: { enabled } } = this;

    this.setState({ enabled: !enabled });

    chrome.storage.sync.set({
      [enabledStorageKey]: !enabled
    });
  }

  render() {
  	const {
      addLabelOp,
      handleNewLabelChange,
      removeLabelOp,
      state: { enabled, labelOps, newLabel, showError },
      toggleEnabled,
    } = this;

    return (
      <div>
        <Typography variant="h5" mb={2}>Tim Tam Genderfier 3k</Typography>

        <Typography variant="subtitle1">Enabled</Typography>
        <Divider/>

        <FormControlLabel
          control={
            <Switch checked={enabled} onChange={toggleEnabled} />
          }
          label={enabled ? 'On' : 'Off'}
          style={{ margin: '8px 8px 24px' }}
        />

        <Typography variant="subtitle1">Spectrum Labels</Typography>
        <Divider/>

        <List>
        {
        	labelOps.map((op: string[]): JSX.Element => (
        		<ListItem
              key={op[0]}
              secondaryAction={
          			<IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(): void => removeLabelOp(op)}
                  disabled={labelOps.length === 1}
                >
          				<Delete/>
          			</IconButton>
              }
            >
        			<ListItemText>{op.join(', ')}</ListItemText>
        		</ListItem>
        	))
        }

        <form
        	onSubmit={addLabelOp}
      		style={{ padding: "0px 4px 0px 16px", marginBottom: '16px' }}
        >
      		<Input
      			fullWidth={true}
            inputProps={{ maxLength: '40' }}
      			placeholder="New, genders!"
      			onChange={handleNewLabelChange}
      			value={newLabel}
            error={showError}
      			endAdornment={
      				<InputAdornment position="end">
      					<IconButton type="submit">
      						<Add/>
      					</IconButton>
      				</InputAdornment>
      				}
      			/>
            {
              showError &&
              <FormHelperText error={true}>
                {inputErrorText}
              </FormHelperText>
            }
        </form>
        </List>
      </div>
    );
  }
}
