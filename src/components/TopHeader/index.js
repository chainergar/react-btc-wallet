import React, { Component } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setWalletKeys, setBtcBalance } from '../../redux/actions/wallet'
import { setAuth, setEmail } from '../../redux/actions/auth'
import './style.scss';

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = (dispatch) => ({
  setWalletKeys(arg) {
    dispatch(setWalletKeys(arg));
  },
  setAuth(arg) {
    dispatch(setAuth(arg));
  },
  setBtcBalance(arg) {
    dispatch(setBtcBalance(arg));
  }
});

class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null
    }
  }

  initialize() {
    this.props.setWalletKeys({})
    this.props.setAuth(false)
    this.props.setBtcBalance(0)
  }

  onSignOut = () => {
    // this.initialize()
    window.location.href="https://app.coinica.org/"
  }

  render() {
    const { email } = this.props
    const menu = (
      <Menu>
        <Menu.Item onClick={this.onSignOut}>
          <span><LogoutOutlined />Sign Out</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className='top-header'>
        <span className="avatar-container">
          <Dropdown overlay={menu} placement="bottomRight">
            <span>
              <Avatar icon={<UserOutlined />} />
              <span className="avatar-email-container">
                {email}
              </span>
            </span>
          </Dropdown>
        </span>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
