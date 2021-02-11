const baseUrl = `http://localhost:5000/api/rockers`;

const get = setData => fetch(baseUrl)
                    .then(response => response.json())
                    .then(info => setData(info))
                    .catch(error => console.log(error));

const add = musician => fetch(`http://localhost:5000/api/rockers`, {
                            method: "POST", 
                            body: JSON.stringify(musician), 
                            headers: { 
                                "Content-type": "application/json; charset=UTF-8"
                            } 
                        });

const remove = e => fetch(`http://localhost:5000/api/rockers/${e.target.id}`, {
                                    method: 'DELETE'
                                });


export default { get, add, remove };