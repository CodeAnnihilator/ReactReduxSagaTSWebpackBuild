import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Redirect, Route, Switch} from 'react-router-dom';

import CommonLayout from 'library/common/components/Layouts/Common/CommonLayout';
import ProtectedLayout from 'library/common/components/Layouts/Protected/ProtectedLayout';

const Routes = () => (
	<Switch>
		<Redirect exact from='/user' to='/user/dashboard' />
		<Route
			path='/user'
			render={({match: {url}}) => (
				<ProtectedLayout>
					<Switch>
						<Route path={`${url}/dashboard`} component={() => <h2>protected route - SCU and etc...</h2>} />
						<Route render={() => <div>Oops...</div>} />
					</Switch>
				</ProtectedLayout>
			)}
		/>
		<Route
			path='/'
			render={() => (
				<CommonLayout>
					<Switch>
						<Route exact path='/' component={() => <h2>public route - login and etc...</h2>} />
						<Route render={() => <div>Oops...</div>} />
					</Switch>
				</CommonLayout>
			)}
		/>
	</Switch>
);

export default hot(module)(Routes);
