import { PREFIX } from './config';

export async function getUser(id){
    console.log("id",id);
    return fetch(`${PREFIX}/user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id
    })
        .then(response => response.json())
        .catch(error => console.error('Error fetching user:', error));
}