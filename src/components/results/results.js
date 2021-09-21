import "./results.scss";
export default function Results(props) {
    if (props.resultsIsLoading === "loading") {
        return (
            <section>
                <pre id="resultsPre">Loading...</pre>
            </section>
        );
    } else if (props.resultsIsLoading === "done") {
        return (
            <section>
                <pre id="resultsPre">{props.data ? JSON.stringify(props.data, undefined, 4) : null}</pre>
            </section>
        );
    } else if (props.resultsIsLoading === "waiting for user input") {
        return (
            <section>
                <pre id="resultsPre">Waiting for user input...</pre>
            </section>
        );
    } else {
        return (
            <section>
                <pre id="resultsPreError"><span>\\\\ Error getting data \\\\</span></pre>
            </section>
        );
    }
}
