import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import PetList from './components/PetList/Petlist'
import PetItem from './components/PetItem/PetItem'
import PetDetailPage from './components/PetDetailPage/PetDetailPage'
import EditPet from './components/EditPet/EditPet'

import axios from 'axios'
import Header from './components/Header/Header'
import {fecthAllPets} from './services/api-helper'

import './App.css';


class App extends Component  {
  constructor() {
    super();
    this.state = {
      pets: null,
      apiDataLoaded: false,
      currentPet: {}
    };
  }

  getPetData = async ()=>{
    const pets = await fecthAllPets();
    this.setState({
      pets: pets,
      apiDataLoaded:true
    })
  }

  componentDidMount = async () => {
    this.getPetData()
  }
  
  setCurrentPet = (pet) => {
    this.setState({
      currentPet: pet
    })
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
       <Header />

       <Switch>
        <Route exact path= '/pets' 
              render={()=> <PetList pets={this.state.pets}
                                    setCurrentPet={this.setCurrentPet} />}
        />
              
        {/* <Route exact path= '/pets/:id' 
              render={()=> <PetItem pets={this.state.pets}
                                    setCurrentPet={this.setCurrentPet}
                                    currentPet={this.state.currentPet} />} 
        />   */}
          <Route 
              exact path='/edit-pet/:id'
              render={() => <EditPet 
                pets={this.state.pets}
                currentPet={this.state.currentPet}
                setCurrentPet={this.setCurrentPet} />} 
          />

        <Route exact path= '/pets/:id' 
              render={()=> <PetDetailPage pets={this.state.pets}
                                    setCurrentPet={this.setCurrentPet}
                                    currentPet={this.state.currentPet} />} 
        />  
      </Switch>
    </div>
    );
  }
}

export default App;
