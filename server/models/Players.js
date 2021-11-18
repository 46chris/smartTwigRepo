import mongoose from 'mongoose'; 

const playerSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    //Can probably just hold unto these in frontend (no need to save this) 
    // wins: { 
    //     type: Number,
    //     default: 0, 
    // },

    // pointsTotal: {
    //     type: Number,
    //     default: 0,
    // },
    
    /**Maybe */
    //ranking: Number, 
})

const Player = mongoose.model('Player', playerSchema);
export default Player; 