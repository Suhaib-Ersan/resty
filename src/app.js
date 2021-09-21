import React, { useState } from "react";
import axios from "axios";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Form from "./components/form/form";
import Results from "./components/results/results";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            requestParams: {},
            resultsIsLoading: "waiting for user input",
        };
    }

    callApi = async (requestParams) => {
        await this.setState({
            resultsIsLoading: "loading",
        });
        try {
            if ((await requestParams.method) === "GET") {
                let resData = await axios.get(requestParams.url);
                let data = resData.data;
                console.log(`GET resData >>>>>> `, resData);
                this.setState({ data, requestParams, resultsIsLoading: "done" });
            } else if ((await requestParams.method) === "POST") {
                let resData = await axios.post(requestParams.url, requestParams.body);
                let data = resData.data;
                console.log(`POST resData >>>>>> `, resData);
                this.setState({ data, requestParams, resultsIsLoading: "done" });
            } else if ((await requestParams.method) === "PUT") {
                let resData = await axios.put(requestParams.url, requestParams.body);
                let data = resData.data;
                console.log(`PUT resData >>>>>> `, resData);
                this.setState({ data, requestParams, resultsIsLoading: "done" });
            } else if ((await requestParams.method) === "DELETE") {
                let resData = await axios.delete(requestParams.url, requestParams.body);
                let data = resData.data;
                console.log(`DELETE resData >>>>>> `, resData);
                this.setState({ data, requestParams, resultsIsLoading: "done" });
            } else {
                console.log(`DEFAULT resData >>>>>> `, resData);
                const data = {
                    count: 2,
                    results: [
                        { name: "fake thing 1", url: "http://fakethings.com/1" },
                        { name: "fake thing 2", url: "http://fakethings.com/2" },
                    ],
                };
                const formData = {
                    method: "Mock data GET",
                    url: "https://pokeapi.co/api/v2/pokemon",
                };
                this.setState({ data, requestParams: formData });
            }
        } catch {
          await this.setState({
            resultsIsLoading: "error",
          })
        }
    };

    render() {
        return (
            <>
                <Header />
                <div id="mainSection">
                    
                    <Form handleApiCall={this.callApi} />
                    <div>Request Method: {this.state.requestParams.method}</div>
                    <div>URL: {this.state.requestParams.url}</div>
                    <Results  data={this.state.data} resultsIsLoading={this.state.resultsIsLoading} />
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
