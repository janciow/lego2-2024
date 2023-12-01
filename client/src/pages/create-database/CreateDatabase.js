import axios from "axios";
import { useEffect, useState } from "react";

import './CreateDatabase.css';
import SimpleTable from "../../components/tables/SimpleTable";

const CreateDatabase = () => {

    const [baseColors, setBaseColors] = useState([]);
    const [exactColors, setExactColors] = useState([]);

    useEffect(() => {
        getBaseColors();
        getExactColors();
    }, []);

    // // Function to submit the form data using Axios
    const createBaseColorTable = async () => {
        try {
             await axios.post("/api/create-database/create-color-family-table");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const insertBaseColors = async () => {
        try {
             await axios.post("/api/create-database/insert-colors-family");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const getBaseColors = async () => {
        try {
            const response = await axios.get("/api/create-database/color-family");
            setBaseColors(response.data.result)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const createExactColorTable = async () => {
        try {
            await axios.post("/api/create-database/create-color-exact-table");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };


    const getExactColors = async () => {
        try {
            const response = await axios.get("/api/create-database/color-exact");
            setExactColors(response.data.result)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="create-database">
            <h1>Create Database 3</h1>
            <h2>Base Colors</h2>
            <div className="create-database__wrapper">
                <div className="create-database__buttons">
                    <h3>Create Base Colors table</h3>
                    <button onClick={() => createBaseColorTable()}>Create Base Colors table</button>

                    <h3>Insert Base Colors </h3>
                    <button onClick={() => insertBaseColors()}>Insert Base Colors</button>

                    <h3>Display all Base Colors  </h3>
                    <button onClick={() => getBaseColors()}>Display Base Colors</button>
                </div>
                <div className="create-database__table">
                    <SimpleTable list={baseColors} key1="id" key2="name" />
                </div>
            </div>
            <hr />
            <h2> Exact Colors </h2>
            <div className="create-database__wrapper">
                <div className="create-database__buttons">
                    <h3>Create Exact Colors table</h3>
                    <button onClick={() => createExactColorTable()}>Create exact Colors table</button>

                    <h3>get Exact Colors</h3>
                    <button onClick={() => getExactColors()}>get exact Colors</button>
                </div>

                <div className="create-database__table">
                    <SimpleTable list={exactColors} key1="color_exact_id" key2="name" />
                </div>
            </div>
        </div>
    );

};

export default CreateDatabase;