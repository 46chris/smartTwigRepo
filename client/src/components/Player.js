//Should have their name, cumulative score, wins

import React from 'react'; 

export default class Player extends React.Component { 
    constructor(props){ 
        super(props); 
        this.state = { 
            wins: 0, 
            cPoints: 0,
            name: props.name
        }
    }

    render(){ 
        return (
            <div>
                <h3>Name: {this.state.name} </h3>
            </div> 
        )
    }

}