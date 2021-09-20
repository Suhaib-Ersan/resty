import React, { useState } from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = async (requestParams) => {
    // mock output
    // if (requestParams.method === "GET") {
    //   let resData = await axios.get(requestParams.url);
    // }
    

    const data = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    await this.setState({data, requestParams});
  }

  render() {
    return (
      <>
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form handleApiCall={this.callApi} />
        <Results data={this.state.data} />
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
