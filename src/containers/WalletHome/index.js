import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Spin } from 'antd';
import btcLogo from '../../assets/images/bitcoin_logo.png';
import { setBtcBalance } from '../../redux/actions/wallet'
import ReceiveModal from './ReceiveModal'
import SendModal from './SendModal'
import { getWalletInfoFromAddress } from '../../utils/wallet'
import './style.scss';

export class WalletHome extends Component {
  state = {
    showReceive: false,
    showSend: false,
    loadingBalance: false,
  }

  componentDidMount() {
    try {
      const address = this.props.walletKeys.sw.address
      this.checkBtcBalance(address)();
    } catch(e) {
      console.log(e)
    }
  }

  checkBtcBalance = (address) => async () => {
    try {
      let pointer = this
      this.setState({loadingBalance: true})
      // window.coinjs.addressBalance(address, function(data) {
      //   try {
      //     pointer.setState({loadingBalance: false})

      //     const parser = new DOMParser()
      //     const xmlDoc = parser.parseFromString(data, 'text/xml')
      //     const balance = parseFloat(xmlDoc.getElementsByTagName("balance")[0].childNodes[0].nodeValue)
      //     pointer.props.setBtcBalance(balance)

      //     setTimeout(pointer.checkBtcBalance(address), 60000)
      //   } catch(e) {
      //     console.log(e)
      //   }
      // })
      const balanceData = await getWalletInfoFromAddress(address)
      this.props.setBtcBalance(balanceData)
      this.setState({loadingBalance: false})
      setTimeout(pointer.checkBtcBalance(address), 120000)
    } catch(e) {
      console.log(e)
    }
  }

  onReceiveClick = () => {
    this.setState({showReceive: true})
  }

  onReceiveCancel = () => {
    this.setState({showReceive: false})
  }

  onSendClick = () => {
    this.setState({showSend: true})
  }

  onSendCancel = () => {
    this.setState({showSend: false})
  }

  render() {
    let {balanceData} = this.props
    let balance = 0

    try {
      balance = balanceData.balance
    } catch(e) {}

    balance = parseFloat(balance) / 100000000
    const { loadingBalance } = this.state
    const usdBalance = balance * 15501

    return (
      <div className='wallet-home-container'>
        <div className='wallet-home-content'>
          <Row gutter={[0, 40]}>
            <Col span={24}>
              <div className='wallet-home-btc-logo'>
                <img src={btcLogo} alt='btc' />
              </div>
            </Col>

            <Col span={24}>
              <Row className='wallet-balance-container'>
                <Col span={24}>
                  <div className='wallet-btc-balance'>
                    <span>{balance.toFixed(8)} BTC</span>
                  </div>
                </Col>

                <Col span={24}>
                  <div className='wallet-usd-balance'>${usdBalance.toFixed(8)} USD</div>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row className='wallet-button-container' gutter={[20, 0]}>
                <Col span={12} className='wallet-send-button' onClick={this.onSendClick}>
                  <Button shape='round' size='large'>
                    Send
                  </Button>
                </Col>
                
                <Col span={12} className='wallet-receive-button'>
                  <Button shape='round' size='large' onClick={this.onReceiveClick}>
                    Receive
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <ReceiveModal 
          visible={this.state.showReceive}
          handleCancel={this.onReceiveCancel}
        />

        <SendModal 
          visible={this.state.showSend}
          handleCancel={this.onSendCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  balanceData: state.wallet.balance,
  walletKeys: state.wallet.keys
});

const mapDispatchToProps = (dispatch) => ({
  setBtcBalance(arg) {
    dispatch(setBtcBalance(arg));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHome);
