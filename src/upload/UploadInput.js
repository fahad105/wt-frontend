import React from 'react';
import './Upload.css';

function onChangeHandler(event){
    console.log(event.target.files[0]);
}

function UploadInput() {
    return(
        <input type="file" name="file" onChange={onChangeHandler}/>
    )
}

export default UploadInput;