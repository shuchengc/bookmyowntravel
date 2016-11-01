import React,{Component,PropTypes} from 'react';
import Header from '../../includes/header';
import axios from 'axios';

class AdminPlanHome extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount(){
        this.state = {
            plans:undefined,
            countries:undefined,
            errMsg:'',
            isHiddenForm:true,
            isHiddenCreateButton:false
        }
    }
    componentDidMount(){
        axios.get("http://localhost:12000/plansList")
        .then((response)=>{
            if (response.data.success){
                const plans = response.data.data;
                plans.sort(function(a,b){
                    return a.name > b.name;
                });
                this.setState({plans})
            }
        })
        .catch(err=>{
            alert(err.toString());
        });
        
        axios.get("http://localhost:12000/countries")
        .then((response)=>{
            if (response.data.success){
                const countries = response.data.data;
                this.setState({countries});
            }else{
                alert(resposnse.data.errMsg);
            }
        })
        .catch(err=>{
            alert(err.toString());
        })
    }
    createButtonClick(){
        this.setState({
            isHiddenForm:false,
            isHiddenCreateButton:true
        });
    }
    onNewPlanSubmit(event){
        event.preventDefault();
        const name = this.refs.name.value;
        const continent = this.refs.continent.value;
        const createdAt = Date();
        const updatedAt = Date();
        const status = "processing";
        axios.post("http://localhost:12000/plans",{name,continent,createdAt,updatedAt,status})
        .then((response)=>{
            if (response.data.success){
                console.log("id:",response.data.data._id);
                this.context.router.push('/admin/plan/new');
            }else{
                alert(response.data.errMsg);
            }
        })
        .catch(err=>{
            alert(err.toString());
        })
    }
    render(){
        if (this.state.plans==undefined||this.state.countries==undefined){
            return(
                <div>Data Loading...</div>
            )
        }
        return(
            <div className="container">
                <Header/>
                <div className="container plan-home">
                    <h2>Admin Travel Plan</h2>
                    <div className={this.state.isHiddenCreateButton?'hidden':''}>
                        <button type="button" className="btn btn-success btn-block" onClick={this.createButtonClick.bind(this)}>New One</button>
                    </div>
                    <div className={this.state.isHiddenForm?'hidden':''}>
                        <form className="form-horizontal" onSubmit={this.onNewPlanSubmit.bind(this)}>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Country Name(Area Name)</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="name" required>
                                        {this.state.countries.map((country)=>{
                                            return(
                                                <option key={country.name}>{country.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/*continent field*/}
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Continent Name</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="continent" required>
                                        <option>Asia</option>
                                        <option>Europen</option>
                                        <option>North Africa</option>
                                        <option>South Africa</option>
                                        <option>Africa</option>
                                        <option>Oceania</option>
                                        <option>Antarctica</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-8">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                    &nbsp;&nbsp;
                                    <button type="reset" className="btn btn-default" onClick={()=>{this.setState({isHiddenForm:true, isHiddenCreateButton:false})}}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="container countries-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Country Name</th>
                                    <th>Continent</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.plans.map((plan)=>{
                                    return(
                                        <tr key={plan._id}>
                                            <td>{plan.name}</td>
                                            <td>{plan.continent}</td>
                                            <td>{plan.createdAt}</td>
                                            <td>{plan.updatedAt}</td>
                                            <td>{plan.status}</td>
                                            <td><a href={"/plan/"+plan._id}><i className="glyphicon glyphicon-play-circle"></i></a></td>
                                            <td><a href={"/admin/plan/update/about/"+plan._id}><i className="glyphicon glyphicon-edit"></i></a></td>
                                            <td><a href="#" ><i className="glyphicon glyphicon-remove-circle"></i></a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminPlanHome;