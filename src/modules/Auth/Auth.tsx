import React from 'react';
import {Redirect} from 'react-router-dom'
import Form from 'devextreme-react/form';
import {Button} from 'devextreme-react/button';
import {LoadIndicator} from 'devextreme-react/load-indicator';

import styles from './auth.scss';

interface IProps {
	isAuth: boolean;
	sendAuthData: (login: string, password: string) => void;
}

interface IState {
	login: string;
	password: string;
}

export default class Auth extends React.PureComponent<IProps, IState> {
	public state = {
		login: '',
		password: '',
	};
	
	private readonly submitAuthForm = (e: any) => {
		e.preventDefault();
		const { login, password } = this.state;
		this.props.sendAuthData(login, password);
	}
 
	public render() {
		const { login, password } = this.state;
		const { isAuth } = this.props;
		const loading = false;
		
		if(isAuth) {
			return <Redirect to='/dashboard' />
		}

		return (
			<div className={styles.auth}>
			<div className={styles.auth__form}>
				<form onSubmit={this.submitAuthForm}>
					<Form
						id='auth'
						formData={{
							username: login,
							password: password,
						}}
						items={[
							{
								dataField: 'username',
								label: {
									text: 'Пользователь',
								},
								validationRules: [{ type: 'required', message: 'Обязательное поле' }],
								editorOptions: {
									value: login,
									onValueChanged: (e: any) => this.setState({ login: e.value }),
								},
							},
							{
								dataField: 'password',
								label: {
									text: 'Пароль',
								},
								validationRules: [{ type: 'required', message: 'Обязательное поле' }],
								editorOptions: {
									mode: 'password',
									value: password,
									onValueChanged: (e: any) =>  this.setState({ password: e.value }),
								},
							},
						]}
						labelLocation='top'
						validationGroup='authForm'
					/>
					<Button
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
					</Button>
				</form>
			</div>
		</div>
		);
	}
}
