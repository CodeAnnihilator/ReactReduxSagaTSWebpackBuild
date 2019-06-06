import React from 'react';
import {withRouter} from 'react-router';
import Tabs from 'devextreme-react/tabs';

import styles from './tabs.scss';
import {views} from './tabConfig';

class TabsPannel extends React.PureComponent<any> {

	public state = {
		selectedIndex: 0,
	}

	private readonly onSelectionChanged = (args: any) => {
		if (args.name === 'selectedIndex') {
			this.setState({selectedIndex: args.value});
			this.props.history.push('/dashboard' + views[args.value].path);
		}
	}

	public render() {
		const {selectedIndex} = this.state;

		return (
			<Tabs
				elementAttr={{class: styles.tabPanel}}
				items={views}
				selectedIndex={selectedIndex}
				onOptionChanged={this.onSelectionChanged}
			/>
		)
	}
}

export default withRouter(TabsPannel);