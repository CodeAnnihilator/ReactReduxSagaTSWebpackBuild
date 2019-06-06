import React, {PureComponent} from 'react';

import {ContextMenu, TreeView} from 'devextreme-react';

import styles from './tree.scss';

export default class Tree extends PureComponent<{}> {

	protected onItemClick = (e: any) => {
		if (!e.itemData.items) {
			e.itemData.fn(e);
		}
	}

	protected onTreeItemClick = (e: any) => console.log(e);

	protected createChildren = (parentNode: any) => {
		if (!parentNode) {
			return [{id: '1', text: 'Каталог'}];
		}

		return [
			{
				text: 'Test 2',
				hasItems: true,
				id: '1_1',
				parentId: '1',
			},
		];
	}

	public render() {
		return (
			<div className={styles.catalog}>
				<TreeView
					elementAttr={{
						id: 'catalogTree',
						class: styles.catalogTree,
					}}
					dataStructure={'plain'}
					keyExpr={'Id'}
					displayExpr={'text'}
					parentIdExpr={'parentId'}
					hasItemsExpr={'IsGroup'}
					virtualModeEnabled={true}
					onItemClick={this.onTreeItemClick}
					createChildren={this.createChildren}
				/>
					<ContextMenu
						width={200}
						target={'#tree'}
						onItemClick={this.onItemClick}
					/>
			</div>
		);
	}
}
