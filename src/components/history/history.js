import "./history.scss";
import ReactJson from "react-json-view";
export default function History(props) {
    console.log(`requestParams >>> `, props.requestParams);
    return (
        <div id="historyContainer">
            {props.requestParams
                ? props.requestParams.map((request, idx) => {
                      return (
                          <div key={idx} className="singleHistoryContainer">
                              <div>
                                  <div className="reqParamsCont"><div className="reqParamsMethod">{request.method}</div>
                                  <div className="reqParamsURL"> {request.url}</div></div>
                                  
                                  {request.failed ? <div title="Request Failed" className="reqParamsFailed">✕</div> : <div title="Request Succeeded" className="reqParamsSucceeded">◯</div>}
                              </div>
                              {/* <div>{request.body ? <ReactJson collapsed="true" className="reqParamsURLBody" src={request.body} /> : <ReactJson collapsed="true" className="reqParamsURLBody" />}</div> */}
                          </div>
                      );
                  })
                : null}
        </div>
    );
}
