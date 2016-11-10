import React, {Component} from 'react';
import axios from 'axios';
import config from '../../../../config';

class PlanGetThereUpdateForm extends Component{
    componentWillMount(){
        this.state = {
            countries: undefined,
            errMsg:'',
            plan:undefined,
            isHiddenErrMsg:true,
            isHiddenSuccessMsg:true
        }
    }
    componentDidMount(){
        const id = this.props.id;
        const host = config.API_SERVER;
        const country_url = 'http://'+host+':12000/countries';
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
            this.setState({errMsg:err.toString()})
            alert(err.toString);
        });
        const plan_url = 'http://'+host+':12000/plans/'+id;
        axios.get(plan_url)
        .then((response)=>{
            if (response.data.success){
                const plan = response.data.data;
                this.setState({plan});
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
    onChangeAirportName(event){
        const airport_name = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.international_airports[index].airport_name = airport_name;
        this.setState({plan})
    }
    onChangeAirportLat(event){
        const lat = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.international_airports[index].geo_location.lat = lat;
        this.setState({plan})
    }
    onChangeAirportLon(event){
        const lon = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.international_airports[index].geo_location.lon = lon;
        this.setState({plan})
    }
    onChangeAirportWebsiteLink(event){
        const airport_website_link = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.international_airports[index].airport_website_link = airport_website_link;
        this.setState({plan})
    }
    addNewAirport(){
        let plan = this.state.plan;
        const airport = {
            "airport_name":"",
            "geo_location":{
                "lat":"",
                "lon":""
            },
            "airport_website_link":""
        }
        plan.how_to_get_there.international_airports.push(airport);
        this.setState({plan});
    }
    removeAirport(num){
        let plan = this.state.plan;
        const newInternationalAirports = plan.how_to_get_there.international_airports.filter((airport,index)=>{
            return index != num;
        })
        plan.how_to_get_there.international_airports = newInternationalAirports;
        this.setState({plan});
    }
    onChangeFullServiceAirlinesImageLink(event){
        const full_service_airlines_image_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.full_service_airlines_image_link = full_service_airlines_image_link;
        this.setState({plan});
    }
    onChangeFullServiceAirlinesWebsiteLink(event){
        const website_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.website_link = website_link;
        this.setState({plan});
    }
    onChangeFullServiceAirlinesText(event){
        const text = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.text = text;
        this.setState({plan});
    }
    onChangeFullServiceAirlineListWebsiteName(event){
        const name = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website[index].name = name;
        this.setState({plan});
    }
    onChangeFullServiceAirlinesWebsiteLink(event){
        const website_link = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website[index].website_link = website_link;
        this.setState({plan});
    }
    removeFullServiceAirline(num){
        let plan = this.state.plan;
        const newFullServiceAirlineListWebsite = plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website.filter((website,index)=>{
            return index != num;
        })
        plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website = newFullServiceAirlineListWebsite;
        this.setState({plan});
    }
    addNewFullServiceAirline(){
        const website = {
            "name":"",
            "website_link":""
        }
        let plan = this.state.plan;
        plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website.push(website);
        this.setState({plan});
    }
    onChangeBudgetAirlinesImageLink(event){
        const budget_airlines_image_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.budget_airlines_image_link = budget_airlines_image_link;
        this.setState({plan});
    }
    onChangeBudgetAirlinesWebsiteLink(event){
        const website_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.website_link = website_link;
        this.setState({plan});
    }
    onChangeBudgetAirlinesText(event){
        const text = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.text = text;
        this.setState({plan});
    }
    onChangeBudgetAirlinesListWebsiteName(event){
        const name = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website[index].name = name;
        this.setState({plan});
    }
    onChangeBudgetAirlinesListWebsiteWebsiteLink(event){
        const website_link = event.target.value;
        const index = event.target.name;
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website[index].website_link = website_link;
        this.setState({plan});
    }
    removeBudgetAirlines(num){
        let plan = this.state.plan;
        const newBudgetAirlineListWebsite = plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website.filter((website,index)=>{
            return index != num;
        })
        plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website = newBudgetAirlineListWebsite;
        this.setState({plan});
    }
    addNewBudgetAirline(){
        const website = {
            "name":"",
            "website_link":""
        }
        let plan = this.state.plan;
        plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website.push(website);
        this.setState({plan});
    }
    onChangeCuriseImageLink(event){
        const cruise_image_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.cruise.cruise_image_link = cruise_image_link;
        this.setState({plan});
    }
    onChangeCuriseWebsiteLink(event){
        const website_link = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.cruise.website_link = website_link;
        this.setState({plan});
    }
    onChangeCuriseText(event){
        const text = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.cruise.text = text;
        this.setState({plan});
    }
    onChangeCuriseCruiseWebsite(event){
        const website = event.target.value;
        let plan = this.state.plan;
        plan.how_to_get_there.cruise.cruise_website = website;
        this.setState({plan});
    }
    onUpdateGetThereSubmit(event){
        event.preventDefault();
        const id = this.props.id;
        const host = config.API_SERVER;
        const url = 'http://'+host+':12000/plans/'+id;
        axios.put(url,this.state.plan)
        .then(response=>{
            if (response.data.success){
                this.setState({isHiddenSuccessMsg:false});
            }else{
                const errMsg = response.data.errMsg;
                this.setState({errMsg});
                this.setState({isHiddenErrMsg:false});
                //alert(errMsg)
            }
        })
        .catch(err=>{
            this.setState({errMsg:err.toString()});
            this.setState({isHiddenErrMsg:false});
            //alert(err.toString());
        })
    }
    render(){
        if (this.state.errMsg){
            return(
                <div>{this.state.errMsg}</div>
            )
        }
        if (this.state.countries==undefined||this.state.plan==undefined){
            return(
                <div>Loading country data...</div>
            )
        }
        return(
            <div className="container new-plan-get-there">
                <form className="form-horizontal" onSubmit={this.onUpdateGetThereSubmit.bind(this)}>
            
                    {/* international airport */}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.state.name} international airport
                        </div>
                        <div className="panel-body">
                            {this.state.plan.how_to_get_there.international_airports.map((airport,num)=>{
                                return (
                                    <div className="panel panel-default" key={"airport_"+num}>
                                        <div className="panel-heading">
                                            international airport {num+1}
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">international airport name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={airport.airport_name} name={num} onChange={this.onChangeAirportName.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">international airport latitude</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={airport.geo_location.lat} name={num} onChange={this.onChangeAirportLat.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">international airport longitude</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={airport.geo_location.lon} name={num} onChange={this.onChangeAirportLon.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">international airport website link</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={airport.airport_website_link} name={num} onChange={this.onChangeAirportWebsiteLink.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-success btn-block" onClick={()=>this.removeAirport(num)}>Remove the international airport</button>
                                            </div>
                                        </div>
                                    </div>
                                        )
                            })}

                            <div className="col-md-12">
                                <button className="btn btn-success btn-block" onClick={this.addNewAirport.bind(this)}>Add a New international airport</button>
                            </div>
                        </div>
                    </div>
                    
                    {/*full service airlines*/}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.state.name} full service airlines
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">full service airlines image link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.full_service_airlines.full_service_airlines_image_link} onChange={this.onChangeFullServiceAirlinesImageLink.bind(this)} required/>
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">full service airlines website link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.full_service_airlines.website_link} onChange={this.onChangeFullServiceAirlinesWebsiteLink.bind(this)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">full service airlines text</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.full_service_airlines.text} onChange={this.onChangeFullServiceAirlinesText.bind(this)} required/>
                                </div>
                            </div>
                            {this.state.plan.how_to_get_there.flights.full_service_airlines.full_service_airline_list_website.map((website,num)=>{
                                return (
                                    <div className="panel panel-default" key={"full_service_airline_website_"+num}>
                                        <div className="panel-heading">
                                            full service airlines {num+1}
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">airline name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={website.name} name={num} onChange={this.onChangeFullServiceAirlineListWebsiteName.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">airline website link</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={website.website_link} name={num} onChange={this.onChangeFullServiceAirlinesWebsiteLink.bind(this)} required/>
                                                </div>
                                            </div> 
                                            <div className="col-md-12">
                                                <button className="btn btn-success btn-block" onClick={()=>this.removeFullServiceAirline(num)}>Remove the  full service airline</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="col-md-12">
                                <button className="btn btn-success btn-block" onClick={this.addNewFullServiceAirline.bind(this)}>Add a New full service airline</button>
                            </div>
                        </div>
                    </div>
                                
                    {/*budget airlines*/}
                     <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.state.name} budget airlines
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">budget airlines image link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.budget_airlines.budget_airlines_image_link} onChange={this.onChangeBudgetAirlinesImageLink.bind(this)} required/>
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">budget airlines website link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.budget_airlines.website_link} onChange={this.onChangeBudgetAirlinesWebsiteLink.bind(this)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">budget airlines text</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.flights.budget_airlines.text} onChange={this.onChangeBudgetAirlinesText.bind(this)} required/>
                                </div>
                            </div>
                            {this.state.plan.how_to_get_there.flights.budget_airlines.budget_airlines_list_website.map((website,num)=>{
                                return (
                                    <div className="panel panel-default" key={"budget_airline_website_"+num}>
                                        <div className="panel-heading">
                                            budget airlines {num+1}
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">airline name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={website.name} name={num} onChange={this.onChangeBudgetAirlinesListWebsiteName.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-4">
                                                    <label className="control-label">airline website link</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" value={website.website_link} name={num} onChange={this.onChangeBudgetAirlinesListWebsiteWebsiteLink.bind(this)} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-success btn-block" onClick={()=>this.removeBudgetAirlines(num)}>Remove the budget airline</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="col-md-12">
                                <button className="btn btn-success btn-block" onClick={this.addNewBudgetAirline.bind(this)}>Add a new budget airline</button>
                            </div>
                        </div>
                    </div>

                    {/*cruise*/}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.state.name} cruise
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">cruise image link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.cruise.cruise_image_link} onChange={this.onChangeCuriseImageLink.bind(this)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">cruise website link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.cruise.website_link} onChange={this.onChangeCuriseWebsiteLink.bind(this)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">cruise text</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.cruise.text} onChange={this.onChangeCuriseText.bind(this)} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-4">
                                    <label className="control-label">cruise extra website link</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={this.state.plan.how_to_get_there.cruise.cruise_website} onChange={this.onChangeCuriseCruiseWebsite.bind(this)} required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Message field*/}
                    <div className={this.state.isHiddenErrMsg?'hidden':''}>
                        <div className="col-md-12">
                            <h4 className="error-msg">{this.state.errMsg}</h4>
                        </div>
                    </div>
                    <div className={this.state.isHiddenSuccessMsg?'hidden':''}>
                        <div className="col-md-12">
                            <h4 className="success-msg">The plan info has successfully updated</h4>
                        </div>
                    </div>                
                                    
                    <div className="form-group">
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-success">Save and Continued</button>&nbsp;&nbsp;
                            <button type="reset" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default PlanGetThereUpdateForm;