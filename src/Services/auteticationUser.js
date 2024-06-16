


export const authenticationService = {
    loginUser,
    verifiqueToken,
    
};


async function loginUser(credentials) {
    return fetch( process.env.REACT_APP_API_URL + '/secretaria/ingresar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((data) => data.json())
      .then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
     
   }

   async function verifiqueToken(token) {
    return fetch( process.env.REACT_APP_API_URL + '/secretary/verify/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })
      .then(data => data.json())
   }  

