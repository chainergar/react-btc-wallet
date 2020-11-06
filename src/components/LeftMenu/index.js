import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import './style.scss';
import { withRouter, Link } from 'react-router-dom';

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
});

class LeftMenu extends Component {
  render() {
    return (
      <>
        <Menu
          theme='dark'
          mode='inline'
        >
          <Menu.Item key='home-page' icon={<DashboardOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftMenu));
