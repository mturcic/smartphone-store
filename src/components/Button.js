import React from 'react';

class AwesomeButton extends React.Component {
  constructor() {
    super()
    this.state = {
      status: false,
      text: 'Save',
      class: '',
    }
  }
  
  click() {
    this.setState({
      status: !this.state.status,
      text: (!this.state.status) ? String.fromCharCode('10003') : 'Save',
      class: (!this.state.status) ? 'checked' : '',
    })
  }
 
  render() {
    return (
<button 
  className={`awesome-btn ` + this.state.class}
  onClick={this.click.bind(this)}>{this.state.text}</button>
    )
  }
}

export default AwesomeButton;