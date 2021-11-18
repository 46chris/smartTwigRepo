//This component was to be the start screen. This is where the user would 
//Store new names and choose existing ones to be in their upcoming tourney. 

import React from 'react'; 
import ReactDOM from 'react-dom'; 

import { getNames, addName} from '../api/api';
import Game from './Game'

export default class Start extends React.Component { 
    //Have user enter the players on render
    //Still need to get list of players from database 
    constructor(){ 
        super(); 
        this.state = { 
            existingPlayers: null, 
            currentPlayers : [],
            ranking : [], 
        }
    }

    componentDidMount() { 
        getNames().then( (response) => { 
            this.setState({existingPlayers:response});
        })
    }

    handleSubmit(event) { 
        event.preventDefault(); 
        addName(event.target[0].value);

        //Also add it to the currplay list 
        // const liel = document.createElement('li'); 
        // liel.innerHTML = event.target[0].value;
        // document.querySelector(".currPlay").append(liel); 
        // this.state.currentPlayers.push(event.target[0].value); 
    }

    //On click of the existing players, they are added into the 
    //competition list 
    addPlayer(name) { 
        this.state.currentPlayers.push({
            name: name, 
            totScore: 0,
            winCount:0,
        }); 
        const liel = document.createElement('li'); 
        liel.innerHTML = name;
        document.querySelector(".currPlay").append(liel); 
    }

    //when called, this'll call all the currentPlayers
    getPlayers(){ 
        return this.state.currentPlayers; 
    }

    startGame(){ 
        ReactDOM.render(<Game players={this.state.currentPlayers}/>, document.getElementById('root')); 
    }

    render(){ 
        return (
            <div>
                <div className='playerAddition'>
                    <h2>Choose who's playing today</h2>
                    <h3>Existing Players</h3>

                    {/* Ugly but queries database and returns the players  */}
                    {this.state.existingPlayers === null ?
                        <p>Loading..</p>
                    :
                        <div>{this.state.existingPlayers.map(player => (
                            <button onClick={()=> this.addPlayer(player.name)}>{player.name}</button>
                        ))}</div>}

                    {/* Just for adding new names to database */}
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='new'>Enter name: </label>
                        <input type='text' id='new'></input>
                        <input type="submit" value="Submit"></input>
                    </form>

                    <ul className="currPlay">
                        {/* {this.state.currentPlayers.map(player => (
                            <li>{player}</li>
                        ))} */}
                    </ul>
                    <button onClick={()=> this.startGame()}> Start Game</button>
                </div>
            </div> 
        )
    }
    
}