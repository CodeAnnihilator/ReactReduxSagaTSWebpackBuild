import React from 'react';

import {DataGrid as DataGridComponent} from 'devextreme-react';

import {customers} from 'resources/fakeData';

const DataGrid = () => (
	<DataGridComponent
		dataSource={customers}
		columns={['CompanyName', 'City', 'State', 'Phone', 'Fax']}
		showBorders={true}
		height={'100%'}
	/>
);

export default DataGrid;
