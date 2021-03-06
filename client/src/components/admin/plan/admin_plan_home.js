import React,{Component,PropTypes} from 'react';
import Header from '../../includes/header';
import axios from 'axios';
import config from '../../../config';
class AdminPlanHome extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount(){
        this.state = {
            plans:undefined,
            countries:undefined,
            errMsg:'',
            isHiddenNewForm:true,
            isHiddenCopyForm:true,
            isHiddenCreateButton:false
        }
    }
    componentDidMount(){
        console.log('did mount');
        const host = config.API_SERVER;
        const url = 'http://'+host+':12000/plans';
        axios.get(url)
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
        const country_url = "http://"+host+":12000/countries";
        axios.get(country_url)
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
            isHiddenNewForm:false,
            isHiddenCreateButton:true
        });
    }
    createCopyButtonClick(){
        this.setState({
            isHiddenCopyForm:false,
            isHiddenCreateButton:true
        });
    }
    onNewPlanSubmit(event){
        event.preventDefault();
        const name = this.refs.new_country_name.value;
        const continent = this.refs.new_country_continent.value;
        const createdAt = Date();
        const updatedAt = Date();
        const status = "processing";
        const host = config.API_SERVER;
        const url = 'http://'+host+':12000/plans';
        axios.post(url,{name,continent,createdAt,updatedAt,status})
        .then((response)=>{
            if (response.data.success){
                console.log("id:",response.data.data._id);
                const id = response.data.data._id; this.context.router.push('/admin/plan/new/about/'+id);
            }else{
                alert(response.data.errMsg);
            }
        })
        .catch(err=>{
            alert(err.toString());
        })
    }
    onCopyPlanSubmit(event){
        event.preventDefault();
        const name = this.refs.copy_country_name.value;
        const sourcename = this.refs.sourcename.value;
        const continent = this.refs.copy_country_continent.value;
        const createdAt = Date();
        const updatedAt = Date();
        const plans = this.state.plans;
        let plan = plans.find(plan=>{
            return plan.name == sourcename;
        })
        let sourcePlan = JSON.parse(JSON.stringify(plan))
        const status = "committed";
        sourcePlan.name = name;
        sourcePlan.continent = continent;
        sourcePlan.status = status;
        sourcePlan.createdAt = createdAt;
        sourcePlan.updatedAt = updatedAt;
        delete sourcePlan['_id'];
        const host = config.API_SERVER;
        const url = 'http://'+host+':12000/plans';
        console.log('sourcePlan:',sourcePlan);
        axios.post(url,sourcePlan)
        .then((response)=>{
            if (response.data.success){
                let newPlans = this.state.plans;
                const newPlan = response.data.data;
                newPlans.push(newPlan);
                this.setState({
                    plans:newPlans,
                    isHiddenCopyForm:true,
                    isHiddenCreateButton:false
                })
            }else{
                alert(response.data.errMsg);
            }
        })
        .catch(err=>{
            alert(err.toString());
        })
    }
    onDeletePlan(id){
        const host = config.API_SERVER;
        const url = 'http://'+host+':12000/plans/'+id;
        axios.delete(url)
        .then(response=>{
            if (response.data.success){
                const newPlans = this.state.plans.filter(plan=>{
                    return plan._id!=id;
                })
                this.setState({plans:newPlans});
                console.log('3 state:',this.state.plans);
            }else{
                const errMsg = response.data.errMsg;
                this.setState({errMsg});
                alert(errMsg);
            }
        })
        .catch(err=>{
            this.setState({errMsg:err.toString()});
            alert(err.toString());
        })
        
    }
    render(){
        if (this.state.errMsg!=''){
            return (<div>{this.state.errMsg}</div>)
        }
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
                        <div className="col-md-6">
                            <button type="button" className="btn btn-success btn-block" onClick={this.createButtonClick.bind(this)}>New One</button>
                        </div>
                        <div className="col-md-6">
                            <button type="button" className="btn btn-success btn-block" onClick={this.createCopyButtonClick.bind(this)}>Copy One</button>
                        </div>
                    </div>
                    <div className={this.state.isHiddenNewForm?'hidden':''}>
                        <form className="form-horizontal" onSubmit={this.onNewPlanSubmit.bind(this)}>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Country Name(Area Name)</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="new_country_name" required>
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
                                    <select className="form-control" ref="new_country_continent" required>
                                        <option>Asia</option>
                                        <option>Europen</option>
                                        <option>North America</option>
                                        <option>South America</option>
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
                                    <button type="reset" className="btn btn-default" onClick={()=>{this.setState({isHiddenNewForm:true, isHiddenCreateButton:false})}}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                   
                     <div className={this.state.isHiddenCopyForm?'hidden':''}>
                        <form className="form-horizontal" onSubmit={this.onCopyPlanSubmit.bind(this)}>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Country Name(Area Name)</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="copy_country_name" required>
                                        {this.state.countries.map((country)=>{
                                            return(
                                                <option key={country.name}>{country.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Continent Name</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="copy_country_continent" required>
                                        <option>Asia</option>
                                        <option>Europen</option>
                                        <option>North America</option>
                                        <option>South America</option>
                                        <option>Africa</option>
                                        <option>Oceania</option>
                                        <option>Antarctica</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">Copy Country From</label>
                                </div>
                                <div className="col-md-8">
                                    <select className="form-control" ref="sourcename" required>
                                        {this.state.countries.map((country)=>{
                                            return(
                                                <option key={country.name}>{country.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-8">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                    &nbsp;&nbsp;
                                    <button type="reset" className="btn btn-default" onClick={()=>{this.setState({isHiddenCopyForm:true, isHiddenCreateButton:false})}}>Cancel</button>
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
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.plans.map((plan)=>{
                                    const datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan,null,4));
                                    const countryName= plan.name;
                                    return(
                                        <tr key={plan._id}>
                                            <td>{plan.name}</td>
                                            <td>{plan.continent}</td>
                                            <td>{plan.createdAt.substring(0,10)}</td>
                                            <td>{plan.updatedAt.substring(0,10)}</td>
                                            <td>{plan.status}</td>
                                            <td><a href={"/plan/"+plan._id}><i className="glyphicon glyphicon-play-circle"></i></a></td>
                                            <td><a href={"/admin/plan/update/"+plan._id}><i className="glyphicon glyphicon-edit"></i></a></td>
                                            <td><a href="#" name={plan._id} onClick={()=>this.onDeletePlan(plan._id)}><i className="glyphicon glyphicon-remove-circle" ></i></a></td>
                                            <td><a href={datastr} download={countryName+".json"}><i className="glyphicon glyphicon-download-alt"></i></a></td>
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