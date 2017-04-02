import React from 'react';
import './css/index.css';
export default class WXSaveApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'wxchat-save-main-ui '+( this.props.isEntry === 2 ? 'show':'')}>
      		dsadasd
      </div>
    );
  }
}
