import { useState } from "react";

import './ImportText.css';


const ImportText = () => {
    const [files, setFiles] = useState([]);

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {

    
            setFiles(e.target.result);
            const result = e.target.result.split(/\r?\n/);
            const tableResult = result.map(item => item.split('|'));
            console.log('tableResult', tableResult);
        };
    };
    return (
        <>
            <h1>Upload TeXt file</h1>

            <input type="file" onChange={handleChange} />
            <pre>
                {files}
            </pre>

        </>
    );
}

export default ImportText;