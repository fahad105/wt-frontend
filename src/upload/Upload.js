import React from 'react';
import { BlobServiceClient } from '@azure/storage-blob'
import './Upload.css';

class Upload extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.fileInput = React.createRef();
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async onClickHandler(event){
        console.log(this.state.selectedFile);
        console.log(this.fileInput);
        console.log("//////////////////////////")
        //WORKS
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
    
    onChangeHandler(event){
        console.log(event);
        console.log(event.target.files[0]);
        this.setState({"selectedFile": event.target.files[0]});
    }
       
    componentDidMount(){
        console.log(this.state.selectedFile)
        //TODO: Move to env file, or better: create azure function to retrieve SAS token with short expiry
        const account = "wtazurestorage";
        const sas = "";
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
        this.containerClient = blobServiceClient.getContainerClient("images");
    }

    render() {
        return(
            <>
                <input type="file" name="file" className="uploadInput" onChange={this.onChangeHandler} ref={this.fileInput}/>
                <button className="uploadButton" onClick={this.onClickHandler}>Upload</button>
            </>
        )
    }

}

export default Upload;
