// import axios from "axios";
// import { useState } from "react";
import ParsedJsonTable from "../components/tables/ParsedJsonTable";

const ImportImages = () => {

    // const [urlList, setUrlList] = useState([]);

    const handleClick = (json, setnumber, url) => {
        console.log( setnumber, url);
      };

    return (
        <div>
            <h1>Import images</h1>
            <h3>Get parset JSON</h3>
            <ParsedJsonTable rowButtonClick={handleClick}/>
        </div>
    );
};

export default ImportImages;