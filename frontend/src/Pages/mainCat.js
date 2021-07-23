import React from 'react';

const mainCat = props =>{
    //console.log(props.history.location.pathname)
    //console.log(props.match.params.name)
    return(
        <div>
            main sub
            <h1>{props.match.params.name}</h1>
        </div>
    )
}

export default mainCat;