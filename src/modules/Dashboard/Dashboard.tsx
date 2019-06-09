import React from 'react';
import { connect } from 'react-redux';

import Tabs from 'library/common/components/Tabs/Tabs';
import Tree from 'library/common/components/Tree/Tree';

import {requestTestDataStart} from 'library/common/actions/entities'

import styles from './dashboard.scss';

const Dashboard = ({children, requestTestDataStart}: any) => (
	<div className={styles.dashboard}>
	<button onClick={() => requestTestDataStart()}>FETCH ENTITIES</button>
	<div className={styles.dashboard__content}>
		<Tree />
		<div className={styles.dashboard__content__views}>
			<Tabs />
			{/* {children} */}
		</div>
	</div>
	</div>
);

const mapDispatchToProps = (dispatch: any) => {
	return {
		requestTestDataStart: () => dispatch({ type: "@@ENTITIES/REQUEST_TEST_DATA_START"})
	}
}

export default connect(null, mapDispatchToProps)(Dashboard);
