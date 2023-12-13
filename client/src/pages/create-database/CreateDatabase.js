import axios from "axios";
import { useEffect, useState } from "react";

import './CreateDatabase.css';
import SimpleTable from "../../components/tables/SimpleTable";

const CreateDatabase = () => {

    const [baseColors, setBaseColors] = useState([]);
    const [exactColors, setExactColors] = useState([]);
    const [bricks, setBricks] = useState([]);

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

    const getBricks = async () => {
        try {
            const response = await axios.get("/api/create-database/brick");
            setBricks(response.data.result)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const getLegoSets = async () => {
        try {
            const response = await axios.get("/api/create-database/lego-sets");
            setBricks(response.data.result)
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };


    const createBrickTable = async () => {
        try {
            await axios.post("/api/create-database/create-brick-table");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const createLegoSetsTable = async () => {
        try {
            await axios.post("/api/create-database/create-lego-sets-table");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const createLegoSetsPartsTable = async () => {
        try {
            await axios.post("/api/create-database/create-lego-sets-parts-table");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (

        <>
            <h1>Create Database</h1>

            <div className="create-database">

                <div className="create-database__panel create-database__panel--bricks">
                    <h2> Brick </h2>
                    <div className="create-database__wrapper">
                        <div className="create-database__buttons">
                            <h3>Create Brick table</h3>
                            <button onClick={() => createBrickTable()}>Create Brick table</button>

                            <h3>Create Lego Sets table</h3>
                            <button onClick={() => createLegoSetsTable()}>Create Lego Sets table</button>

                            <h3>Create Lego Sets Parts table</h3>
                            <button onClick={() => createLegoSetsPartsTable()}>Create Lego Sets Parts table</button>

                            <h3>Reload Brick</h3>
                            <button onClick={() => getBricks()}>bach Brick</button>

                            <h3>Reload lego sets</h3>
                            <button onClick={() => getLegoSets()}>bach Lego sets</button>
                        </div>

                        <div className="create-database__table">
                            <SimpleTable list={bricks} key1="element_id" key2="description" />
                        </div>
                    </div>
                </div>

                <div className="create-database__panel">
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

                </div>



                <div className="create-database__panel">
                    <h2> Exact Colors </h2>
                    <div className="create-database__wrapper">
                        <div className="create-database__buttons">
                            <h3>Create Exact Colors table</h3>
                            <button onClick={() => createExactColorTable()}>Create exact Colors table</button>

                            <h3>Display all Exact Colors</h3>
                            <button onClick={() => getExactColors()}>Exact Colors</button>
                        </div>

                        <div className="create-database__table">
                            <SimpleTable list={exactColors} key1="color_exact_id" key2="name" />
                        </div>
                    </div>
                </div>



            </div>
        </>
    );

};

export default CreateDatabase;