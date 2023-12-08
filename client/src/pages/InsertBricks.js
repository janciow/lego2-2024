import { useState } from "react";
import axios from "axios";
import ParsedJsonTable from "../components/tables/ParsedJsonTable";

const InsertBricks = () => {

    const [parsedJsonRow, getParsedJsonRow] = useState({
        url: '',
        setnumber: '',
        json: '',
    });

    const [previewQuery, getPreviewQuery] = useState('');

    const setRow = (json, setnumber, url) => {
        getParsedJsonRow({ setnumber, url, json });
    };

    const fetchPreviewData = async () => {
        try {

            const { url, setnumber, json } = parsedJsonRow;
            const response = await axios.post("/api/insert-bricks/preview-data-to-insert-bricks", {
                url, setnumber, json,
            });
            getPreviewQuery(response.data.insertColorQuery);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };
    const insertData = async () => {
        try {

            const { url, setnumber, json } = parsedJsonRow;
            await axios.post("/api/insert-bricks/insert-bricks", {
                url, setnumber, json,
            });
           
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };



    return (
        <>
            <h1>InsertBricks</h1>

            <ParsedJsonTable rowButtonClick={setRow} />

            <div>url {parsedJsonRow.url}</div>
            <div>setNumber {parsedJsonRow.setnumber}</div>
            {/* <div>json {parsedJsonRow.json}</div> */}

            <button onClick={() => fetchPreviewData()}>preview data</button>

            <div>
                {previewQuery}
            </div>
            <hr />

            <button onClick={() => insertData()}>insert data</button>


            <pre>
                {parsedJsonRow.json}
            </pre>

        </>
    )
};

export default InsertBricks;