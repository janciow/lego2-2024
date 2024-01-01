import { useState } from "react";
import axios from "axios";

import './Bricks.css';
import MediumTable from "../../components/tables/MediumTable";

const Bricks = () => {

    const [brickData, getBrickData] = useState({
        rows: [],
        fields: [],
    });


    const fetchBricksData = async () => {
        try {
            const limit = 100;
            const offset = 0;

            const response = await axios.get(`/api/bricks?limit=${limit}&offset=${offset}`, {
                limit, offset
            });
            getBrickData({
                rows: response.data.result.rows || [],
                fields: response.data.result.fields || [],
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    console.log(brickData)

    return (
        <>
            <h1>Bricks</h1>
            <div className="bricks">
                <div>
                    <h3> Bricks</h3>
                    <button onClick={() => fetchBricksData()}>bricks </button>
                    <MediumTable rows={brickData.rows} fields={brickData.fields} />
                </div>
            </div>
        </>
    )
};

export default Bricks;