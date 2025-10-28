import {useState, useEffect} from "react";
import API from "../services/api";

function LinkList(){
    const [urls, setUrls] = useState([]);

    useEffect(()=>{
        const fetchUrls = async() => {
            try{
                const res = await API.get("/urls");
                setUrls(res.data);
            }catch(err){
                console.error("Error fetching URLs", err);
            }
        };
        fetchUrls();
    },[]);

    return(
        <div>
            <h2>Your Shortened Links</h2>
            {urls.length === 0 ? (<p>No links yet. Create one above!</p>) : ()}
        </div>
    );
}

export default LinkList;