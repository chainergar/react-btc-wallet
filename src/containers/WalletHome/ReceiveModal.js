/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Row, Col, Input } from 'antd';
import QRCode from "react-qr-code";
import './style.scss';

export class ReceiveModal extends Component {
  render() {
    let address = ''

    try {
      address = this.props.walletKeys.sw.address
    } catch(e) {
      console.log(e)
    }

    return (
      <div>
        <Modal
          title='Receive BTC'
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          footer={null}
          className='send-receive-btc-modal'
        >
          <Row gutter={[0, 30]} className="receive-btc-content">
            <Col span={24} className='receive-btc-text'>
              Your Bitcoin Address
            </Col>

            <Col span={24} className='receive-btc-address-container'>
              <Input
                placeholder='Your btc address...'
                value={address}
                size='large'
                disabled
              />
            </Col>

            <Col span={24}>
              <div className='receive-btc-qrcode'>
                <QRCode
                  value={`bitcoin:${address}`}
                  size={200}
                />
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveModal);
