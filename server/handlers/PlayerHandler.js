import Player from '../models/Players.js'; 

//Get
export const getNames = async (req, res) => { 
    try{ 
        //Should return all players
        const storedNames = await Player.find()

        //Respond and send
        res.status(200).json(storedNames);
    }
    catch (err) { 
        console.log('Get failed')
        res.status(400).json( {message: err.message}); 
    }
}

//Post
export const regNames = async (req, res) => { 
    const newName = new Player(req.body); 
    try{ 
        //Save to mongoose
        await newName.save();
        
        res.status(200).json(newName); 
    } catch (error) { 
        res.status(401).json({message: error.message}); 
    }
}