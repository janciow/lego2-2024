import axios from "axios";
import { useState } from "react";
import ParsedJsonTable from "../components/tables/ParsedJsonTable";

const ImportImages = () => {

    const [urlList, setUrlList] = useState([]);

    // Function to submit the form data using Axios
    const getImageListForSet = async () => {
        try {
            const response = await axios.get("/api/image-files/list");
            setUrlList(response.data.result);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const importImages = async (jsonSring, setNumber) => {
        try {
            const response = await axios.post("/api/image-files/import", {
                jsonSring,
                setNumber,
              });
                console.log(response)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div>
            <h1>Import images ff</h1>
            <h3>Get parset JSON</h3>
            <button onClick={() => getImageListForSet()}>Get parset JSON</button>
            <table >
                <thead>
                    <tr>
                        <td>setnumber</td>
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
                            <td><button onClick={() => importImages(json, setnumber)}>Get JSON</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr></hr>

            <ParsedJsonTable />
        </div>
    );
};

export default ImportImages;