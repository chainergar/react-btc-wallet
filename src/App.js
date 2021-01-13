import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.scss';
import LeftMenu from './components/LeftMenu';
import TopHeader from './components/TopHeader';
import WalletHome from './containers/WalletHome';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import {
  getLocalStoreItem,
  setLocalStoreItem,
  getWalletInfo,
  getRandomMasterKey,
} from './utils';
import { setWalletKeys } from './redux/actions/wallet';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    try {
      // let bitcoinInfo = localStorage.getItem('coinica-bitcoin');
      let bitcoinInfo = getLocalStoreItem('coinica-bitcoin');
      console.log('bitcoinInfo on constructor: \n', bitcoinInfo);

      if (bitcoinInfo && bitcoinInfo.masterKey && bitcoinInfo.masterKey2) {
        const walletInfo = getWalletInfo(
          bitcoinInfo.masterKey,
          bitcoinInfo.masterKey2
        );

        props.setWalletKeys(walletInfo);
      } else {
        const masterKey = getRandomMasterKey();
        const masterKey2 = getRandomMasterKey();
        const walletInfo = getWalletInfo(masterKey, masterKey2);

        props.setWalletKeys(walletInfo);
        const bitcoinInfo = {
          masterKey,
          masterKey2,
          updatedAt: Date.now(),
        };
        // localStorage.setItem('bitcoinInfo', JSON.stringify(bitcoinInfo))
        setLocalStoreItem('coinica-bitcoin', bitcoinInfo);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className='App'>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setWalletKeys(arg) {
    dispatch(setWalletKeys(arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
