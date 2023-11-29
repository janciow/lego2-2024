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
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };


    const onClick = (json, setnumber, url) => {
        // props.sendData(user)
        console.log(json, setnumber, url);
      }

    return (
        <div>
            <h1>Import images</h1>
            <h3>parsed JSON</h3>
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
                            <td><button onClick={() => onClick (json, setnumber, url)}>Get JSON</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr></hr>
        </div>
    );
};

export default ParsedJsonTable;