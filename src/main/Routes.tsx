import * as React from "react";
import { hot } from "react-hot-loader";
import { Redirect, Route, Switch } from "react-router-dom";

import CommonLayout from "library/common/components/Layouts/Common/CommonLayout";
import ProtectedLayout from "library/common/components/Layouts/Protected/ProtectedLayout";
import Auth from "modules/Auth/containers/AuthContainer";
import DataGrid from 'library/common/components/DataGrid/DataGrid';
import Dashboard from "modules/Dashboard/Dashboard";

const Routes = () => (
	<Switch>
		<Redirect exact from="/dashboard" to="/dashboard/sku" />
		<Route
			path="/dashboard"
			render={({ match: { url } }) => (
				<ProtectedLayout>
					<Dashboard>
						<Switch>
							<Route
								path={`${url}/sku`}
								component={() => <DataGrid />}
							/>
							<Route path={`${url}/rules`} component={() => <h1>rules</h1>} />
							<Route path={`${url}/new-sku`} component={() => <h1>new-sku</h1>} />
							<Route path={`${url}/pricing`} component={() => <h1>pricing</h1>} />
							<Route path={`${url}/sales`} component={() => <h1>sales</h1>} />
							<Route path={`${url}/suppliers`} component={() => <h1>suppliers</h1>} />
							<Route render={() => <div>Oops...</div>} />
						</Switch>
					</Dashboard>
				</ProtectedLayout>
			)}
		/>
		<Route
			path="/"
			render={() => (
				<CommonLayout>
					<Switch>
						<Route path="/auth" component={Auth} />
						<Route render={() => <div>Oops...</div>} />
					</Switch>
				</CommonLayout>
			)}
		/>
	</Switch>
);

export default hot(module)(Routes);
