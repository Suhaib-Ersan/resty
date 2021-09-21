import { useState, useEffect } from "react";
import "./form.scss";

export default function Form(props) {
    const [callMethod, setCallMethod] = useState("GET");
    const [body, setBody] = useState("");

    useEffect(() => {
        console.log(callMethod, body);
    }, [callMethod, body]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            method: callMethod,
            url: e.target.url.value,
            body: body,
        };
        props.handleApiCall(formData);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="urlAndMethod">
                    <label>
                        <span>URL: </span>
                        <input name="url" type="text" onFocus={(event) => event.target.select()} defaultValue="https://pokeapi.co/api/v2/pokemon" />
                        <button type="submit">GO!</button>
                    </label>
                    <label className="methods">
                        <input name="httpMethod" value="GET" type="radio" defaultChecked id="get" onClick={() => setCallMethod("GET")} />
                        <label htmlFor="get">GET</label>
                        <input name="httpMethod" value="POST" type="radio" id="post" onClick={() => setCallMethod("POST")} />
                        <label htmlFor="post">POST</label>
                        <input name="httpMethod" value="PUT" type="radio" id="put" onClick={() => setCallMethod("PUT")} />
                        <label htmlFor="put">PUT</label>
                        <input name="httpMethod" value="delete" type="radio" id="delete" onClick={() => setCallMethod("DELETE")} />
                        <label htmlFor="delete">DELETE</label>
                    </label>
                </div>
                <div id="bodyText">
                    <label>Body</label>
                    <textarea name="bodyText" id="bodyText" rows="4" onChange={(e) => setBody(e.target.value)} />
                </div>
            </form>
        </>
    );
}
