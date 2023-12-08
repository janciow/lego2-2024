import axios from "axios";
import { useState } from "react";
import ParsedJsonTable from "../../components/tables/ParsedJsonTable";

import './ImportImages.css';

const ImportImages = () => {

    const [selectedRow, setSelectedRow] = useState({
        setNumber: '',
        url: '',
        jsonString: ''
    });

    const [urlsToDisplay, setUrlsToDisplay] = useState([]);

    const importImages = async () => {
        await axios.post("/api/image-files/import", {
            setNumber: selectedRow.setNumber, jsonString: selectedRow.jsonString,
        });
    };

    const selectRow = async (json, setnumber, url) => {
        setSelectedRow({
            setNumber: setnumber,
            url: url,
            jsonString: json
        })
    };

    const displayImages = async () => {
        const jsonOBj = JSON.parse(selectedRow.jsonString);
        const urlsToDisplay = jsonOBj[selectedRow.setNumber].map(row => row.imgUrl.replace("https://img.bricklink.com", ''))
        setUrlsToDisplay(urlsToDisplay);
    };

    return (
        <>
            <h1>Import images</h1>
            <div className="import-images__wrapper">
                <div>
                    <h3>display images</h3>
                    {selectedRow.setNumber}
                    {selectedRow.url}

                    <hr></hr>
                    <button onClick={() => displayImages()}>Display Images 2</button>
                    <button onClick={() => importImages()}>Import Images</button>

                    <ul>
                        {urlsToDisplay.map((img, index) => (
                            <li key={index}>
                                <img src={'img' + img} alt="lego" /> {img}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Get parsed JSON</h3>
                    <ParsedJsonTable rowButtonClick={selectRow} />
                </div>
            </div>
        </>
    );
};

export default ImportImages;