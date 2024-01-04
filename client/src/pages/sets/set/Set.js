import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import MediumTable from "../../../components/tables/MediumTable";

const Set = () => {

    const [setData, getSetData] = useState({
        rows: [],
        fields: [],
    });

    useEffect(() => {
        fetchSetData();
    }, []);

    const navigate = useNavigate();

    let { setId } = useParams();

    const fetchSetData = async () => {
        try {
            const response = await axios.get(`/api/sets/${setId}`);
            getSetData({
                rows: response.data.result.rows || [],
                fields: response.data.result.fields || [],
            });
        } catch (error) {
            console.error("Error creating setsData:", error);
        }
    };

    const goBack = () => {
        navigate(`/sets`);
      };

    return (
        <>
            <h1>set {setId}</h1>
            <div className="setData">
                <div>
                    <h3> Bricks</h3>
                    <button onClick={() => goBack()}>go back</button>
                    <MediumTable rows={setData.rows} fields={setData.fields} keyIndex={1} />
                </div>
            </div>
        </>
    )
};

export default Set;