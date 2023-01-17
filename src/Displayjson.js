import React from "react";
//import "./App.css"
class DisplayJson extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            // list:[]
            apiResponse:[]
        }
        this.callAPI = this.callAPI.bind(this)
        this.callAPI();
    }
    callAPI() {
        //Fetch data from API
        // fetch("http://dummy.restapiexample.com/api/v1/employees").then(
        fetch("http://localhost:9000/logsAPI").then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.setState({
                // list:[data].data
                apiResponse:data.data
            })
        })
    }
    componentDidMount(){
        this.callAPI()
    }
    render() {
        let tb_data = this.state.apiResponse.map((item,i)=>{
            return(
                <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.employee_salary}</td>
                    <td>{item.employee_age}</td>
                </tr>
            )
        })
        return (
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>EventTimeStamp</th>
                                <th>FullQualifiedName</th>
                                <th>UserName</th>
                                <th>OperationName</th>
                                <th>MessageID</th>
                                <th>CorrelationIDContent</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tb_data}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
export default DisplayJson;
