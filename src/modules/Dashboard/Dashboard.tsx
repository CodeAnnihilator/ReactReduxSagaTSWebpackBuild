import React from 'react';

import Tabs from 'library/common/components/Tabs/Tabs';
import Tree from 'library/common/components/Tree/Tree';

import styles from './dashboard.scss';

const Dashboard = ({children}: any) => (
	<div className={styles.dashboard}>
	<div className={styles.dashboard__content}>
		<Tree />
		<div className={styles.dashboard__content__views}>
			<Tabs />
			{children}
		</div>
	</div>
	</div>
);

export default Dashboard;
