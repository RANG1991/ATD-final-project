import React from 'react';
import UserProfile from "./UserProfile"

class App extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {users: [], rests: []}
  }

  addRestaurant = (restaurant) =>
  {
      let rests = [...this.state.rests, restaurant];
      this.setState({rests: rests})
  };

    addUsername = (username) =>
    {
        let users = [...this.state.users, username];
        this.setState({users: users})
    };

    checkIfExists = (username) =>
    {
        return (this.state.users.includes(username));
    };



  render() {
      return (
          <div className="App">
              <UserProfile addRestaurant={this.addRestaurant} addUsername={this.addUsername}
                           checkIfExists={this.checkIfExists}/>

          </div>
      );
  }
}

export default App;