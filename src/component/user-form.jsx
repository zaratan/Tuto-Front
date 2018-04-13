import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

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
      <Form
        inline
        key="form"
        onSubmit={e => {
          this.handleSubmit(e)
        }}
      >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label htmlFor="name">Nom:</Label>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => {
              this.handleChangeName(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label htmlFor="age">Age:</Label>
          <Input
            type="number"
            name="age"
            value={this.state.age}
            onChange={e => {
              this.handleChangeAge(e.target.value)
            }}
          />
        </FormGroup>
        <Button color="primary">Ajouter</Button>
      </Form>
    )
  }
}

export default UserForm
