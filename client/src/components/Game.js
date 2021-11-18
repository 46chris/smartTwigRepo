import React from 'react'; 

/**
 * This handles all the game logic for the tournament (so I hoped it would
 * run the independent games and keep track of the rankings of the people in the 
 * tournament). It received all participating players from Start.js.
 *  The players are stored as an object array.
 * 
 * As for the leaderboard itself. I didn't get to implementing it but I didn't plan 
 * to store any of that data in the database. The leaderboard of the tournament would 
 * be solely handled by the frontend. The only thing being used by the database is the 
 * registered names.  
 */
export default class Game extends React.Component{ 
    //Assumes that props has two players
    turnCount = 0; 
    server = 1; 
    constructor(props){ 
        super(props); 
        this.state= { 
            player1: null,
            score1: 0,
            player2: null,
            score2: 0, 
            players:props.players, 
        }
    }

    //Keeps track of scores 
    add(player){ 
        if (player === 'p1'){ 
            this.setState({score1: this.state.score1 + 1}); 
        }
        else { 
            this.setState({score2: this.state.score2+ 1});
        }

        //Change the serve if applicable 
        this.turnCount++;
        this.changeServe(); 

        //check if the game is over
        let outcome = this.isGameOver(); 
        console.log(outcome); 
        if (!outcome){ 
            return; 
        }
        else { 
            this.endGame(); 
            this.calcScores(outcome);
        }
    }

    changeServe(){ 
        if (this.turnCount % 2 === 0){
            if (this.server === 1){ 
                this.server = 2
            }
            else { 
                this.server = 1; 
            }
            document.querySelector('.serve').innerHTML = `Server is player ${this.server}`
        } 
    }

    //Adds player to be one of the two in the game 
    addPlayer(name){ 
        if (this.state.player1 === null || this.state.player2 === null){ 
            if (this.state.player1 === null){ 
                this.setState({player1: name})
            }
            else { 
                this.setState({player2:name}); 
            }
        }
    }

    //Returns false if the game is not over 
    //Returns the player who won if the game is over 
    isGameOver(){
        if (this.state.score1 > 10 || this.state.score2 > 10){ 
            if (this.state.score1 >= 10 && this.state.score2 >= 10){ 
                if (this.state.score1 >= this.state.score2 + 2){ 
                    return this.state.player1; 
                }
                if (this.state.score2 >= this.state.score1 + 2){ 
                    return this.state.player2; 
                }
                else { 
                    return false; 
                }
            }
            else { 
                if (this.state.score1 > this.state.score2){ 
                    return this.state.player1; 
                }
                else { 
                    return this.state.player2;
                }
            }
        } 
        else { 
            return false; 
        }
    }

    //Update the cumulative scores and win counts of players involved 
    calcScores(winner){
        if (winner == this.state.player1){ 
            let play1 = this.state.players.find( element => element.name === this.state.player1); 
            play1.totScore += this.state.score1; 
            play1.winCount += 1; 

            let play2 = this.state.players.find( element => element.name === this.state.player2);
            play2.totScore += this.state.score2;  
        }
        else { 
            let play2 = this.state.players.find( element => element.name === this.state.player2); 
            play2.totScore += this.state.score2; 
            play2.winCount += 1; 

            let play1 = this.state.players.find( element => element.name === this.state.player1);
            play1.totScore += this.state.score1;  
        }
    }

    overallWinner(){ 
        let lB =  this.state.players; 
        lB.sort((a,b) => { 
            return a.winCount - b.winCount; 
        }); 
    }

    endGame(){ 
        this.setState({player1: null});
        this.setState({player2: null});
        this.setState({score1: 0});
        this.setState({score2: 0});
        this.server = 1; 
    }


    render(){ 
        return (
            <div>
                <div>
                    <h1>Players in the tourney</h1>
                    <div>{this.state.players.map(player => (
                            <button onClick={()=> this.addPlayer(player.name)}>{player.name}</button>
                        ))}</div>
                </div>
                <div>
                    <h4>{this.state.player1}</h4> 
                    <h4>Score: {this.state.score1}</h4>
                    <button onClick={()=>this.add('p1')}>+</button>
                </div>
                <div>
                    <h4>{this.state.player2}</h4> 
                    <h4>Score: {this.state.score2}</h4>
                    <button onClick={()=>this.add('p2')}>+</button>
                </div>

                <div>
                    <h4 className="serve">Server is player {this.server}</h4> 
                </div>

                <div>
                    <button onClick={()=>this.endGame()}>End the Game</button>
                </div>
            </div>

        )
    }


}