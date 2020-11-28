import React, {useState, useEffect} from 'react';

import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect({
        if(token) {
            try {
                const getUser = async () => {
                    const res = await axios.get('./user/info',{
                        headers: {Authorization: token}
                    });
    
                    console.log(res)
                }
                
            } catch (err) {
                alert(err.response.data.msg);
            }
        }



    },[token]); 

    return (
        <div>
            
        </div>
    )
}

export default UserAPI
