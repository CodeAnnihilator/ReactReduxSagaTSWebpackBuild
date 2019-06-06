import React from 'react';

import Tree from 'library/common/components/Tree/Tree';
import Tabs from 'library/common/components/Tabs/Tabs';

import styles from './dashboard.scss';

class Dashboard extends React.Component<any> {
	render(){
		const { children } = this.props;
		return (
			<div className={styles.dashboard}>
			<div className={styles.dashboard__content}>
				<Tree />
				<div className={styles.dashboard__content__views}>
					<Tabs />
					{children}
				</div>
			</div>
			</div>
		)
	}
}

export default Dashboard