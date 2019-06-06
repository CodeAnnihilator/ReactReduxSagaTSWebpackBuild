import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import ContextMenu from 'devextreme-react/context-menu';

import styles from './tree.scss';

interface IProps {

}

class Tree extends React.PureComponent<IProps> {

	private itemClick(e: any) {
		console.log(e);
		if (!e.itemData.items) {
			e.itemData.fn(e);
		}
	}

	private onTreeItemClick(e: any) {
		console.log(e);
	}

	private createChildren(parentNode: any) {
		console.log(parentNode);
		if (!parentNode) {
			return [{ id: '1', text: 'Каталог' }];
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
					// dataSource={contextMenuItems}
					width={200}
					target={'#tree'}
					onItemClick={this.itemClick}
				/>
		</div>
		)
	}
}


export default Tree;
