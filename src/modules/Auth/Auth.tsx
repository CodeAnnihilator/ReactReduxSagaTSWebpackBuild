import React from 'react';
import Form, {Item} from 'devextreme-react/form';
import {Redirect} from 'react-router-dom';
import {Button} from 'devextreme-react/button';
import {LoadIndicator} from 'devextreme-react/load-indicator';

import styles from './auth.scss';

interface IProps {
	isAuth: boolean;
	sendAuthData: (login: string, password: string) => void;
	verifyToken: () => void;
}

interface IState {
	login: string;
	password: string;
}

export default class Auth extends React.Component<IProps, IState> {
	public state = {
		login: '',
		password: '',
	};
	
	private readonly submitAuthForm = (e: any) => {
		e.preventDefault();
		const {login, password} = this.state;
		this.props.sendAuthData(login, password);
	}

	public render() {
		const {login, password} = this.state;
		const {isAuth} = this.props;
		const loading = false;

		if (isAuth) {
			return <Redirect to='/dashboard' />;
		}

		return (
			<div className={styles.auth}>
			<div className={styles.auth__form}>
				<form onSubmit={this.submitAuthForm}>
					<Form
						id='auth'
						colCount={1}
						formData={{
							username: login,
							password,
						}}
						labelLocation='top'
						validationGroup='authForm'
					>
						<Item
							dataField={'username'}
							validationRules={ [{type: 'required', message: 'Обязательное поле'}]}
							label={{text: 'Пользователь'}}
							editorOptions={{
								value: login,
								onValueChanged: (e: any) => this.setState({login: e.value}),
							}}
						/>
						<Item
							dataField={'password'}
							validationRules={ [{type: 'required', message: 'Обязательное поле'}]}
							label={{text: 'Пароль'}}
							editorOptions={{
								value: password,
								onValueChanged: (e: any) => this.setState({password: e.value}),
							}}
						/>
						<Item
							itemType={'button'}
							buttonOptions={{
								text: 'Войти',
								type: 'success',
								useSubmitBehavior: true,
							}}
							alignment={'center'}
						/>
												{/* <Button
						id={'button'}
						width={180}
						height={36}
						type='success'
						useSubmitBehavior={true}
						className={styles.auth__form__button}
						validationGroup='authForm'
					>
						<LoadIndicator className={styles.auth__form__loading} visible={loading} />
						<span className={styles.auth__form__button__label}>
							{!loading ? 'Войти' : 'Выполняю вход'}
						</span>
					</Button> */}
						
					</Form>

				</form>
			</div>
		</div>
		);
	}
}
