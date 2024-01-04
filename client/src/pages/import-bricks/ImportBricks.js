import { useState } from "react";

import './ImportBricks.css';
import ImportText from "../../components/impotrt-text/ImportText";


const ImportBricks = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {

            let xxx = e.target.result;
            setFiles(xxx);
            // setFileName(e.target.files[0]?.name)
        };
    };

    const clearJson = () => {
        setFiles([]);
        setFileName('')
    }

    const iterateObject = () => {
       JSON.parse(files).forEach(item => {
            if (item.quantity_total && item.quantity_total > 0) console.log(item);
            if (item.quantity_in_set && item.quantity_in_set > 0) console.log(item);
        })
    }

    return (
        <div className="import__wrapper">
            <div>
                <ImportText />
            </div>

            <div>

                <div>   <h1>Upload Json file</h1>
                    <button onClick={() => clearJson()}>clear </button>
                    <button onClick={() => iterateObject()}>iterateObject </button>
                    <input type="file" onChange={handleChange} value={fileName} /></div>
                <div>
                    <pre>
                        {files}
                    </pre>
                </div>

            </div>
        </div>
    );
}

export default ImportBricks;