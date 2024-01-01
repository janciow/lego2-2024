import { useState } from "react";

import './ImportBricks.css';
import ImportText from "../../components/impotrt-text/ImportText";


const ImportBricks = ({ children }) => {
    const [files, setFiles] = useState([]);

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {

            // let xxx = JSON.parse(e.target.result);
            setFiles(JSON.parse(e.target.result));
            // console.log("xxx", xxx);
        };
    };
    return (
        <div className="import__wrapper">
            <div>
                <ImportText />
            </div>

            <div>
                <h1>Upload Json file</h1>
                <input type="file" onChange={handleChange} />
                <pre>
                    {JSON.stringify(files, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default ImportBricks;