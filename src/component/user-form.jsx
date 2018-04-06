import React from 'react'

class UserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: 0,
    }
  }

  handleChangeName(name) {
    this.setState({
      name,
    })
  }

  handleChangeAge(age) {
    this.setState({
      age: age ? parseInt(age) : '',
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addUser(this.state)
  }

  render() {
    return (
      <form
        key="form"
        onSubmit={e => {
          this.handleSubmit(e)
        }}
      >
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={e => {
            this.handleChangeName(e.target.value)
          }}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={this.state.age}
          onChange={e => {
            this.handleChangeAge(e.target.value)
          }}
        />
        <input type="submit" />
      </form>
    )
  }
}

export default UserForm
