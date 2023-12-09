import { useState } from "react";
import axios from "axios";
import ParsedJsonTable from "../../components/tables/ParsedJsonTable";

import './InsertBricks.css';

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
            getPreviewQuery(response.data.brickQuery);
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
            <h1>Insert Bricks</h1>
            <div className="insert-bricks">
                <div>

                    <h3>Insert Brick list for specific SET</h3>
                    <div>url {parsedJsonRow.url}</div>
                    <div>setNumber {parsedJsonRow.setnumber}</div>
                    <button onClick={() => fetchPreviewData()}>preview SQL </button>
                    <div>
                        {previewQuery}
                    </div>
                    <hr />
                    <button onClick={() => insertData()}>insert data</button>

                    <h4>preview prepared JSON</h4>
                    <pre>
                        {parsedJsonRow.json}
                    </pre>
                </div>

                <div>
                    <ParsedJsonTable rowButtonClick={setRow} />
                </div>

            </div>
        </>
    )
};

export default InsertBricks;