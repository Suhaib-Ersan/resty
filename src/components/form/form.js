import { useState } from "react";
import "./form.scss";

export default function Form(props) {
    const [callMethod, setCallMethod] = useState("GET");

    function handleSubmit (e) {
        e.preventDefault();
        const formData = {
            method: callMethod,
            url: e.target.url.value,
        };
        props.handleApiCall(formData);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>URL: </span>
                    <input name="url" type="text" />
                    <button type="submit">GO!</button>
                </label>
                <label className="methods">
                    <span id="get" onClick={() => setCallMethod("GET")}>GET</span>
                    <span id="post" onClick={() => setCallMethod("POST")}>POST</span>
                    <span id="put" onClick={() => setCallMethod("PUT")}>PUT</span>
                    <span id="delete" onClick={() => setCallMethod("DELETE")}>DELETE</span>
                </label>
            </form>
        </>
    );
}
