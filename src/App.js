import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.scss';
import LeftMenu from './components/LeftMenu';
import TopHeader from './components/TopHeader';
import WalletHome from './containers/WalletHome';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import { getWalletInfo } from './utils/wallet';
import { setWalletKeys } from './redux/actions/wallet';
import { setAuth, setEmail } from './redux/actions/auth';

const { Header, Content, Footer, Sider } = Layout;

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

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

class App extends Component {
  state = {};

  componentDidMount() {
    let { auth } = this.props;
    if (!auth) {
      let authByCoinica = localStorage.getItem('authByCoinica')
      try {
        let bitcoinInfo = localStorage.getItem('bitcoinInfo');
        if (bitcoinInfo) {
          bitcoinInfo = JSON.parse(bitcoinInfo);
          if (
            bitcoinInfo.email &&
            bitcoinInfo.password &&
            bitcoinInfo.password.length >= 10
          ) {
            const walletInfo = getWalletInfo(
              bitcoinInfo.email,
              bitcoinInfo.password
            );
            this.props.setWalletKeys(walletInfo);
            this.props.setAuth(true);
            this.props.setEmail(bitcoinInfo.email);
            auth = true;
            localStorage.removeItem('bitcoinInfo');
            localStorage.setItem('authByCoinica', 'true');
          }
        } else if (authByCoinica === 'true') {
          localStorage.removeItem('authByCoinica')
          window.location.href="https://app.coinica.org/"
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    let { auth } = this.props;
    return (
      <div className='App'>
        {auth ? (
          <Layout id='components-layout-demo-responsive'>
            <Sider
              breakpoint='lg'
              collapsedWidth='0'
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              width={250}
            >
              <div className='logo'>BTCWallet</div>

              <div className='left-menu-wrapper'>
                <LeftMenu />
              </div>
            </Sider>

            <Layout className='right-layout'>
              <Header
                className='site-layout-sub-header-background'
                style={{ padding: 0 }}
              >
                <TopHeader />
              </Header>

              <Content style={{ margin: '24px 16px 0' }}>
                <div className='site-layout-background' style={{ padding: 24 }}>
                  <Switch>
                    <Route path='/' component={WalletHome} exact />
                  </Switch>
                </div>
              </Content>

              <Footer style={{ textAlign: 'center' }}>
                BTCWallet @2020 Created by Shardus team
              </Footer>
            </Layout>
          </Layout>
        ) : (
          <Layout>
            <Login />
          </Layout>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
