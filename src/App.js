import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.scss';
import LeftMenu from './components/LeftMenu'
import TopHeader from './components/TopHeader'
import WalletHome from './containers/WalletHome'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login'

const { Header, Content, Footer, Sider } = Layout;

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

class App extends Component {
  state = {
  }

  render() {
    return (
      <div className="App">
        {
          this.props.auth ? 
          <Layout id="components-layout-demo-responsive">
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              width={250}
            >
              <div className="logo">BTCWallet</div>

              <div className="left-menu-wrapper">
                <LeftMenu />
              </div>
            </Sider>

            <Layout className="right-layout">
              <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <TopHeader />
              </Header>

              <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24 }}>
                  <Switch>
                    <Route path="/" component={WalletHome} exact />
                    <Route path="/pair-explorer/:address" component={WalletHome} exact />
                  </Switch>
                </div>
              </Content>
              
              <Footer style={{ textAlign: 'center' }}>BTCWallet @2020 Created by Shardus team</Footer>
            </Layout>
          </Layout> :
          <Layout>
            <Login />
          </Layout>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
