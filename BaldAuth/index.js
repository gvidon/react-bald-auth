import {compose, defaultProps, withProps, withState} from 'recompose';
import crypto from 'crypto-js';
import React, {PropTypes} from 'react';
import styles from './assets/component.css';

const
	Auth = props => (props.isPasswordValid || _.isEmpty(props.passwordHash))
		? props.children

		: <div className={styles.authModal}>
			<form>
				{props.title && <p>{prop.title}</p>}
				<input onChange={props.handlePasswordChange} value={props.password} maxLength="32" type="password" />
				<button onClick={props.handleFormSubmit}>{props.buttonTitle}</button>
			</form>
		</div>;

Auth.propTypes = {
	buttonTitle : PropTypes.string,
	passwordHash: PropTypes.string,
	title       : PropTypes.string
};

export default compose(
	defaultProps({
		buttonTitle: 'Get in!'
	}),

	withState('isPasswordValid', 'setIsPasswordValid', false),
	withState('password', 'setPassword', ''),

	withProps(props => ({
		handleFormSubmit: event => {
			event.preventDefault();
			props.setIsPasswordValid(() => crypto.SHA256(props.password).toString() === props.passwordHash);
		},

		handlePasswordChange: event => {
			const

				// SyntheticEvent is pooled and reused — it will be cleared by the moment function below is called
				value = event.currentTarget.value;

			props.setPassword(() => value);
		}
	}))
)(Auth);
