import React from 'react';
import {DataGrid as DataGridComponent} from 'devextreme-react/data-grid';

import styles from './dataGrid.scss';

import {customers} from 'resources/fakeData';

class DataGrid extends React.Component {
	public render() {
		return (
			<div>
			<DataGridComponent
				dataSource={customers}
				columns={['CompanyName', 'City', 'State', 'Phone', 'Fax']}
				showBorders={true}
				height={'100%'}
			/>
		</div>
		)
	}
}

export default DataGrid;
