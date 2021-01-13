import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Row, Col, Button, Alert } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { getWalletInfo, setLocalStoreItem } from '../../utils';
import { setWalletKeys } from '../../redux/actions/wallet';
import { setAuth, setEmail } from '../../redux/actions/auth';
import './style.scss';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    errorMessage: '',
  };

  _inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLogInClick = () => {
    const { email, password, passwordConfirm } = this.state;

    if (email.length === 0 || password.length === 0 || passwordConfirm === 0) {
      this.setState({
        errorMessage: 'Input all the fields exactly.',
      });
      return;
    }

    if (!email.match(/[\s\w\d]+@[\s\w\d]+/g)) {
      this.setState({
        errorMessage: 'Email should be valid.',
      });
      return;
    }

    if (password.length < 10) {
      this.setState({
        errorMessage: 'Password should be longer than 10 letters.',
      });
      return;
    }

    if (password !== passwordConfirm) {
      this.setState({
        errorMessage: 'Password should match to the confirm password.',
      });
      return;
    }

    this.setState({
      errorMessage: '',
    });

    const walletInfo = getWalletInfo(email, password);

    if (walletInfo.address && walletInfo.sw.address) {
      this.props.setWalletKeys(walletInfo);
      this.props.setAuth(true);
      this.props.setEmail(email);
      // localStorage.setItem(
      //   'bitcoinInfo',
      //   JSON.stringify({
      //     email,
      //     password,
      //     updatedAt: Date.now()
      //   })
      // );
      setLocalStoreItem('coinica-bitcoin',
        {
          email,
          password,
          updatedAt: Date.now()
        }
      )
    }
  };

  render() {
    const { email, password, passwordConfirm, errorMessage } = this.state;

    const titleContainer = (
      <div className='title-container'>
        <span className='app-name'>BTCWallet</span>
      </div>
    );

    return (
      <div className='login-container'>
        <Card title={titleContainer}>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Input
                size='large'
                placeholder='Input email'
                name='email'
                prefix={<MailOutlined />}
                value={email}
                onChange={this._inputChange}
              />
            </Col>

            <Col span={24}>
              <Input.Password
                size='large'
                placeholder='Input password'
                name='password'
                prefix={<KeyOutlined />}
                value={password}
                onChange={this._inputChange}
              />
            </Col>

            <Col span={24}>
              <Input.Password
                size='large'
                placeholder='Input password again'
                name='passwordConfirm'
                prefix={<KeyOutlined />}
                value={passwordConfirm}
                onChange={this._inputChange}
              />
            </Col>

            {errorMessage && errorMessage.length > 0 ? (
              <Col span={24}>
                <Alert
                  message={errorMessage}
                  type='warning'
                  showIcon
                  closable
                />
              </Col>
            ) : (
              <span />
            )}

            <Col span={24}>
              <Button
                size='large'
                type='primary'
                shape='round'
                onClick={this.onLogInClick}
                className='login-button'
              >
                Log In
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  walletKeys: state.wallet.keys,
});

const mapDispatchToProps = (dispatch) => ({
  setWalletKeys(arg) {
    dispatch(setWalletKeys(arg));
  },
  setAuth(arg) {
    dispatch(setAuth(arg));
  },
  setEmail(arg) {
    dispatch(setEmail(arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
