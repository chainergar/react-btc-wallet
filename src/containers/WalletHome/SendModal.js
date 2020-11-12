/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Row, Col, Input, InputNumber, Button } from 'antd';
import { send } from '../../utils/wallet'
import './style.scss';

export class SendModal extends Component {
  state = {
    receipant: '',
    amount: 0
  }

  onReceipantChange = e => {
    this.setState({receipant: e.target.value})
  }

  onAmountChange = value => {
    this.setState({amount: value})
  }

  onSendClick = () => {
    console.log('onSendClick', this)
    try {
      const {receipant, amount} = this.state
      const {walletKeys} = this.props
      const pubkey = walletKeys.pubkey
      const privkey = walletKeys.wif
      const walletAddress = walletKeys.sw.address

      send(receipant, amount, pubkey, privkey, walletAddress)
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    let address = ''
    const {receipant, amount} = this.state

    try {
      address = this.props.walletKeys.sw.address
    } catch(e) {
      console.log(e)
    }

    return (
      <div>
        <Modal
          title='Send BTC'
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          footer={null}
          className='send-receive-btc-modal'
        >
          <Row gutter={[0, 30]} className="send-btc-content">
            <Col span={24} className='send-btc-address-container'>
              <Input
                placeholder='Send to BTC address...'
                size='large'
                value={receipant}
                onChange={this.onReceipantChange}
              />
            </Col>

            <Col span={24} className='send-btc-amount-container'>
              <InputNumber
                placeholder='BTC amount to send'
                size='large'
                value={amount}
                onChange={this.onAmountChange}
              />
            </Col>

            <Col span={24} className='send-btc-button-container'>
              <Button shape='round' size='large' onClick={this.onSendClick}>
                Send
              </Button>
            </Col>

            <Col span={24} className='send-btc-fee-container'>
              <Row gutter={[0, 5]}>
                <Col span={12}>
                  Network Fee
                </Col>
                <Col span={12}>
                  0.00010000
                </Col>
                <Col span={12}>
                  Platform Fee
                </Col>
                <Col span={12}>
                  0.00010000
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <a
                href={`https://blockchair.com/bitcoin/address/${address}`}
                target='_blank'
              >
                View on Blockchain
              </a>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  walletKeys: state.wallet.keys,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SendModal);
