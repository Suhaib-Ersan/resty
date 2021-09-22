import { useState, useEffect, useReducer } from "react";
import "./form.scss";

function formReducer(state, action) {
    switch (action.type) {
        case "CHANGE_BODY":
            return {
                ...state,
                body: action.body,
            };
        case "CHANGE_METHOD":
            return { ...state, method: action.method };
        default:
            return state;
    }
}
export default function Form(props) {
    const [httpData, dispatch] = useReducer(formReducer, {
        method: "GET",
        body: "",
    });

    const [body, setBody] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            ...httpData,
            url: e.target.url.value,
        };
        props.handleApiCall(formData);
    }

    useEffect(() => {
        console.log(httpData.method, httpData.body);
    }, [httpData.method, httpData.body]);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="urlAndMethod">
                    <label>
                        <input name="url" type="text" onFocus={(event) => event.target.select()} defaultValue="https://pokeapi.co/api/v2/pokemon" />
                        <button id="GObutton" type="submit">GO!</button>
                    </label>
                    <label className="methods">
                        <input name="httpMethod" value="GET" type="radio" defaultChecked id="get" onClick={() => dispatch({ method: "GET", type: "CHANGE_METHOD" })} />
                        <label htmlFor="get">GET</label>
                        <input name="httpMethod" value="POST" type="radio" id="post" onClick={() => dispatch({ method: "POST", type: "CHANGE_METHOD" })} />
                        <label htmlFor="post">POST</label>
                        <input name="httpMethod" value="PUT" type="radio" id="put" onClick={() => dispatch({ method: "PUT", type: "CHANGE_METHOD" })} />
                        <label htmlFor="put">PUT</label>
                        <input name="httpMethod" value="delete" type="radio" id="delete" onClick={() => dispatch({ method: "DELETE", type: "CHANGE_METHOD" })} />
                        <label htmlFor="delete">DELETE</label>
                    </label>
                </div>
                <div id="bodyText">
                    <label>Body</label>
                    <textarea name="bodyText" id="bodyText" onChange={(e) => dispatch({ body: e.target.value, type: "CHANGE_BODY" })} />
                </div>
            </form>
        </>
    );
}
