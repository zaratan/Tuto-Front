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

  handleNameChange(name) {
    this.setState({
      name: name
    })
  }

  handleAgeChange(age) {
    this.setState({
      age: parseInt(age)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addUser(this.state)
  }

  render() {
    return (
      <Form inline onSubmit={(e) => {this.handleSubmit(e)}}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label htmlFor="name">Nom</Label>
          <Input
            name="name"
            type="text"
            value={this.state.name}
            onChange={(e) => {this.handleNameChange(e.target.value)}}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label htmlFor="age">Age</Label>
          <Input
            name="age"
            type="number"
            value={this.state.age}
            onChange={(e) => {this.handleAgeChange(e.target.value)}}
          />
        </FormGroup>
        <Button color="primary">Ajouter </Button>
      </Form>
    )
  }
}

export default UserForm
