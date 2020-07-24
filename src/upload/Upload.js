import React from 'react';
import { BlobServiceClient } from '@azure/storage-blob'
import './Upload.css';
import keys from '../keys/keys.json'; //todo: this is not secure and should be changed for sure lmao, getSASToken in Azure Function, httpTrigger

class Upload extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.fileInput = React.createRef();
    }

    onClickHandler = async (event) => {
        if(this.state.selectedFile){
            const blobName = this.state.selectedFile.name;
            const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
            console.log('\nUploading to Azure storage as blob:\n\t', blobName);
            // Upload data to the blob
            const data = this.fileInput.current.files[0]; //get file from input html tag somehow
            const uploadBlobResponse = await blockBlobClient.uploadBrowserData(data)
            alert("Blob was uploaded successfully. Azure function should be trigger soon.");
        }
        else{
            console.log("No file selected")
        }
    }
    
    onChangeHandler = (event) => {
        console.log(event);
        console.log(event.target.files[0]);
        this.setState({"selectedFile": event.target.files[0]});
    }
       
    componentDidMount(){
        //TODO: Move to env file, or better: create azure function to retrieve SAS token with short expiry
        const account = keys.storageAccountName;
        const sas = keys.sas;
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
        this.containerClient = blobServiceClient.getContainerClient("images");
    }

    render() {
        return(
            <div className="uploadContainer">
                <input type="file" className="uploadInput" name="file" className="uploadInput" onChange={this.onChangeHandler} ref={this.fileInput}/>
                <button className="uploadButton buttonBase" onClick={this.onClickHandler}>Upload</button>
            </div>
        )
    }
}

export default Upload;
