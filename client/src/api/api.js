import axios from 'axios'; 

//Use to make a post request to add new names (just allow repeats for now)
export async function addName(newName){ 
    let newPlayer = { 
        name: newName,
    }

    let res = await axios.post('http://localhost:5000/names', newPlayer);
    console.log(res.data);  
}

//Use to get all the registered names 
export async function getNames(){ 
    let res = await axios.get('http://localhost:5000/names'); 
    return res.data; 
}