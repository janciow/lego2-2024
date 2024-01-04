import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Sets.css';
import MediumTable from "../../components/tables/MediumTable";

const Sets = () => {

    const [setsData, getSetsData] = useState({
        rows: [],
        fields: [],
    });

    useEffect(() => {
        fetchSetsData();
    }, []);

    
    const navigate = useNavigate();

    const fetchSetsData = async () => {
        try {
            const limit = 100;
            const offset = 0;

            const response = await axios.get(`/api/sets?limit=${limit}&offset=${offset}`, {
                limit, offset
            });
            getSetsData({
                rows: response.data.result.rows || [],
                fields: response.data.result.fields || [],
            });
        } catch (error) {
            console.error("Error creating setsData:", error);
        }
    };


    const navigateToNewPage = (row) => {
      navigate(`/sets/${row.set_number}`);
    };

    return (
        <>
            <h1>Sets</h1>
            <div className="sets">
                <div>
                    <h3> Bricks</h3>
                    <button onClick={() => fetchSetsData()}>Sets </button>
                    <MediumTable rows={setsData.rows} fields={setsData.fields} onClick={navigateToNewPage} />
                </div>
            </div>
        </>
    )
};

export default Sets;