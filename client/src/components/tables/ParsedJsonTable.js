import axios from "axios";
import { useState, useEffect } from "react";

const ParsedJsonTable = (props) => {

    const [urlList, setUrlList] = useState([]);

    useEffect(() => {
        getImageListForSet();
    }, []);

    // Function to submit the form data using Axios
    const getImageListForSet = async () => {
        try {
            const response = await axios.get("/api/image-files/list");
            setUrlList(response.data.result);
            if (response.data.result[0]) {
                const  {json, setnumber, url}  = response.data.result[0];
                props.rowButtonClick(json, setnumber, url);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const emitRow = (json, setnumber, url) => {
        props.rowButtonClick(json, setnumber, url)
      }

    return (
        <div>
            <h3>parsed JSON form DB</h3>
            <button onClick={() => getImageListForSet()}>reload Links Table from DB</button>
            <table >
                <thead>
                    <tr>
                        <td>set number</td>
                        <td>url</td>
                        <td>json</td>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {urlList.map(({ setnumber, url, json }, index) => (
                        <tr key={index}>
                            <td>{setnumber}</td>
                            <td>{url}</td>
                            <td>{(json && 'yest') || 'nie ma'}</td>
                            <td><button onClick={() => emitRow(json, setnumber, url)}>Get JSON</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr></hr>
        </div>
    );
};

export default ParsedJsonTable;