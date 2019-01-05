import React, { Component } from 'react'
import inbox from './inbox'
import web3 from './web3'

class App extends Component {
  state = {
    lastMessage: '',
    message: '',
    stateMessage: ''
  }

  async componentDidMount() {
    const lastMessage = await inbox.methods.message().call()

    this.setState({ lastMessage })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const accounts = await web3.eth.getAccounts()

    this.setState({ stateMessage: 'Waiting for transaction success...' })

    await inbox.methods.setMessage(this.state.message).send({ from: accounts[0] })

    this.setState({ stateMessage: 'Your message is updated!' })
  }

  onChange = (e) => {
    this.setState({ message: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <p>Last message: {this.state.lastMessage}</p>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.message}
            onChange={this.onChange}
          />
          <button type="submit">Update Message!</button>
        </form>
      </div>
    )
  }
}

export default App
