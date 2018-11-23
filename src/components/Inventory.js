import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => user && this.authHandler({ user }));
  }

  // look up current store in firebase database
  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });
    // claim it as own
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // set state of Inventory to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('loggin out');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    const {
      addFish,
      loadSampleFishes,
      fishes,
      updateFish,
      deleteFish
    } = this.props;

    // check if user logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // check if user owns store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(fishes).map(key => (
          <EditFishForm
            fish={fishes[key]}
            key={key}
            updateFish={updateFish}
            deleteFish={deleteFish}
            index={key}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}
export default Inventory;
