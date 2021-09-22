import React, { useState } from "react";
import axios from "axios";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Form from "./components/form/form";
import Results from "./components/results/results";
import History from "./components/history/history";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            requestParams: [],
            resultsIsLoading: "waiting for user input",
        };
    }

    callApi = async (reqPara) => {
        await this.setState({
            resultsIsLoading: "loading",
        });
        try {
            let resData;
            if ((await reqPara.method) === "GET") {
                resData = await axios.get(reqPara.url);
                console.log(`GET resData >>>>>> `, resData);
            } else if ((await reqPara.method) === "POST") {
                resData = await axios.post(reqPara.url, reqPara.body);
                console.log(`POST resData >>>>>> `, resData);
            } else if ((await reqPara.method) === "PUT") {
                resData = await axios.put(reqPara.url, reqPara.body);
                console.log(`PUT resData >>>>>> `, resData);
            } else if ((await reqPara.method) === "DELETE") {
                resData = await axios.delete(reqPara.url, reqPara.body);
                console.log(`DELETE resData >>>>>> `, resData);
            } else {
                console.log(`DEFAULT resData >>>>>> `, resData);
                resData = {
                    count: 2,
                    results: [
                        { name: "fake thing 1", url: "http://fakethings.com/1" },
                        { name: "fake thing 2", url: "http://fakethings.com/2" },
                    ],
                };
                reqPara = {
                    method: "Mock data GET",
                    url: "https://pokeapi.co/api/v2/pokemon",
                };
            }
            reqPara.failed = false;
            this.setState({ data: resData, requestParams: [reqPara,...this.state.requestParams], resultsIsLoading: "done" });
        } catch {
            reqPara.failed = true;
            await this.setState({
                requestParams: [reqPara,...this.state.requestParams],
                resultsIsLoading: "error",
            });
        }
    };

    render() {
        return (
            <>
                <Header />
                <div id="mainSection">
                    <Form handleApiCall={this.callApi} />
                    <div id="resultsAndHistory">
                        <History requestParams={this.state.requestParams} />
                        <Results data={this.state.data} resultsIsLoading={this.state.resultsIsLoading} />
                    </div>
                </div>

                <Footer />
            </>
        );
    }
}

export default App;

// import React, { useState } from "react";

// import "./app.scss";

// import Header from "./components/header";
// import Footer from "./components/footer";
// import Form from "./components/form/form";
// import Results from "./components/results";

// export default function App() {
//     const [data, setData] = useState(null);
//     const [requestParams, setRequestParams] = useState({});

//     allApi = (requestParams) => {
//       // mock output
//         const data = {
//             count: 2,
//             results: [
//                 { name: "fake thing 1", url: "http://fakethings.com/1" },
//                 { name: "fake thing 2", url: "http://fakethings.com/2" },
//             ],
//         };
//         setRequestParams(requestParams);
//         setData(data);
//     };

//     return (
//         <React.Fragment>
//             <Header />
//             <div>Request Method: {this.state.requestParams.method}</div>
//             <div>URL: {this.state.requestParams.url}</div>
//             <Form handleApiCall={this.callApi} />
//             <Results data={this.state.data} />
//             <Footer />
//         </React.Fragment>
//     );
// }
