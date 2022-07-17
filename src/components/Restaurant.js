import React, { Component, Fragment } from 'react';
import '../styles/filter.css';
import axios from 'axios';


class Restaurant extends Component{
    constructor(){
        super();
        this.state = {
            mealtype_id:undefined,
            restaurant_list:undefined,
            locations:[],
            restaurantByLoc:[],
            location_id:undefined,
            cuisine_id:[],
            min_price:undefined,
            max_price:undefined
        }
    }

    handleLocations = (data) => {
        if(data){
            return (
                data.map((item)=>{
                    return(
                        <option key={item._id} value={item.location_id}>{item.name}</option>
                    )
                })
            )
        }
        else{
            <div>loading....</div>
        }
    }

    handleRestaurant = (data) => {
        
        if(data.length>0){
            return data.map((item)=>{
                return(
                    <div className="row item-boxes mb-4" key={item._id}>
                        <div className="col-xl-3 col-lg-5 col-md-5">
                            <img src={item.image} width="100%" height="100%" />
                        </div>
                        <div className="col-xl-9 col-lg-7 col-md-7">
                            <h3>{item.name}</h3>
                            <h4>{item.locality}</h4>
                            <p>{item.city}</p>
                        </div>
                        <div className="col-12">
                            <hr className="mt-1 mb-1 mt-lg-4 mb-lg-3"/>
                        </div>
                        <div className="col-12">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>CUISINES</th>
                                        <td>:</td>
                                        <td>
                                            {item.cuisine.map((item)=>{
                                                return item.name
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>COST FOR TWO (in Rupees)</th>
                                        <td>:</td>
                                        <td>{item.min_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })
        }
        else{
            return(
                <div className="row item-boxes mb-4">
                   <div className="col-12">
                        <center>
                            <p>Sorry! no data available.</p>
                        </center>
                    </div>
                   <div className="col-12">
                        <hr className="mt-1 mb-1 mt-lg-4 mb-lg-3"/>
                    </div>
                </div>
            )
        }
    }

    handleStateChange = async (state,value) => {
        try{
            if (state=="cuisine_id"){
                let new_cuisine = [...this.state.cuisine_id]
                let getIndex = new_cuisine.indexOf(value)
                if (getIndex==-1){
                    new_cuisine.push(value)
                    await this.setState({
                        cuisine_id: new_cuisine
                    })
                }else{
                    new_cuisine.splice(getIndex,1)
                    await this.setState({
                        cuisine_id: new_cuisine
                    })
                }
            }else if(state=="max_price"){
                if( value && value.min_price && value.max_price && value.max_price !== null){
                    await this.setState({
                        min_price:value.min_price,
                        max_price:value.max_price
                    })
                }else if(value && value.min_price && value.max_price && value.max_price === null){
                    await this.setState({
                        min_price:value.min_price,
                        max_price:""
                    })
                }else{
                    await this.setState({
                        min_price:0,
                        max_price:500
                    })
                }

            }else{
                await this.setState({
                    [state]:Number(value)
                })
            }
        }
        finally{
            this.handleFilter()
        }
        
    }

    handleFilter = () =>{
        
        if(this.state.mealtype_id){
            axios({
                method: 'get',
                url: `http://localhost:5001/restaurants/?mealtype_id=${this.state.mealtype_id}`
                +`&location_id=${this.state.location_id?this.state.location_id:''}`
                +`&min_price=${this.state.min_price?this.state.min_price:''}`
                +`&max_price=${this.state.max_price?this.state.max_price:''}`
                +`&cuisine_id=${this.state.cuisine_id?this.state.cuisine_id:''}`
                })
                .then((response)=> {
                    this.setState({
                    restaurant_list:response.data,
                    })
                }).catch(
                    function(error){
                        console.log('Error while fetching location api',error)
                    }
                )
        }
        
        
        
    }

    handleLoading = () => {
        return (
            <div>
                <center>Loading...</center>
            </div>
        )
    }

    componentDidMount(){
        let urlParams = new URLSearchParams(window.location.search);
        let myParam = urlParams.get('mealtype_id');
        if(myParam !== null || myParam !==undefined){
            axios({
                method: 'get',
                url: 'http://localhost:5001/restaurants/?mealtype_id='+myParam,
            })
            .then((response)=> {
                if(response.status==200){
                    this.setState({
                        restaurant_list:response.data,
                        mealtype_id:myParam
                    })
                }
            
            }).catch(
                (error)=>{
                    // console.log('Error while fetching location api',error)
                    this.setState({
                        restaurant_list:[]
                    })
                }
            )
        }

        axios({
            method: 'get',
            url: 'http://localhost:5001/locations',
          })
            .then((response)=> {
                if(response.status==200){
                    this.setState({
                        locations:response.data,
                    })
                }
              
            }).catch(
                (error)=>{
                    // console.log('Error while fetching location api',error)
                    this.setState({
                        locations:[],
                    })
                }
            )
    }
    render(){
        const {restaurant_list} = this.state
        return(
            <Fragment>
                <section>
                    <div className="container">
                        <div className="row"> 
                            <div className="col-12 my-3">
                                <h1 className="filter-headline mx-lg-2">Breakfast places in India</h1>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-4 d-none d-md-block mb-5">
                                
                                <div className="search-filter-box mx-lg-2">
                                    <h3><i className="fa fa-filter me-2" aria-hidden="true"></i>Filters</h3>
                                    <h4> <i className="fa fa-map-marker me-2" aria-hidden="true"></i>Select location :</h4>
                                    <select name='location' onChange={(event)=>this.handleStateChange('location_id',event.target.value)}>
                                        <option value={-1}>Select any location</option>
                                        {this.state.locations.length>0?this.handleLocations(this.state.locations):''}
                                    </select>
                                    <h4><i className="fa fa-cutlery me-2" aria-hidden="true"></i>Cuisine :</h4>
                                    <div className="col-12">
                                        <input type="checkbox" id="north-indian" name=""  onChange={(event)=>this.handleStateChange('cuisine_id',1)}/>
                                        <label htmlFor="north-indian">North Indian</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="checkbox" id="south-indian" name=""  onChange={(event)=>this.handleStateChange('cuisine_id',2)}/>
                                        <label htmlFor="south-indian">South Indian</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="checkbox" id="chinese" name=""  onChange={(event)=>this.handleStateChange('cuisine_id',3)}/>
                                        <label htmlFor="chinese">Chinese</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="checkbox" id="fast-food" name=""  onChange={(event)=>this.handleStateChange('cuisine_id',4)}/>
                                        <label htmlFor="fast-food">Fast Food</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="checkbox" id="street-food" name="food"  onChange={(event)=>this.handleStateChange('cuisine_id',5)}/>
                                        <label htmlFor="street-food">Street Food</label>
                                    </div>
                                    <h4><i className="fa fa-inr me-2" aria-hidden="true"></i>Cost For Two :</h4>
                                    <div className="col-12">
                                        <input type="radio" id="less-than-500" name="cost"  onChange={(event)=>this.handleStateChange('max_price',{min_price:0,max_price:500})}/>
                                        <label htmlFor="less-than-500">Less than &#8377;500 </label>
                                    </div>
                                    <div className="col-12">
                                        <input type="radio" name="cost" id="between-500-and-1000" onChange={(event)=>this.handleStateChange('max_price',{min_price:500,max_price:1000})} />
                                        <label htmlFor="between-500-and-1000">&#8377;500 to &#8377;1000 </label>
                                    </div>
                                    <div className="col-12">
                                        <input type="radio" name="cost" id="between-1000-and-1500"  onChange={(event)=>this.handleStateChange('max_price',{min_price:1000,max_price:1500})} />
                                        <label htmlFor="between-1000-and-1500">&#8377;1000 to &#8377;1500</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="radio" name="cost" id="between-1500-and-2000" onChange={(event)=>this.handleStateChange('max_price',{min_price:1500,max_price:2000})} />
                                        <label htmlFor="between-1500-and-2000">&#8377;1500 to &#8377;2000</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="radio" name="cost" id="above-2000" onChange={(event)=>this.handleStateChange('max_price',{min_price:2000,max_price:null})} />
                                        <label htmlFor="above-2000">Above &#8377;2000</label>
                                    </div>
                                    {/* <h4><i className="fa fa-sort-alpha-asc me-2" aria-hidden="true"></i>Sort :</h4>
                                    <div className="col-12">
                                        <input type="radio" name="price" id="low-to-high"  onChange={(event)=>this.handleFilter('sort_type',event.target.value)}/>
                                        <label htmlFor="low-to-high">Price low to high</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="radio" name="price" id="high-to-low" />
                                        <label htmlFor="high-to-low">Price high to low</label>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-8 mb-5">
                                <div className="item-box">
                                    {restaurant_list?this.handleRestaurant(restaurant_list):this.handleLoading()}
                                    <div className="row mt-5">
                                        <div className="col-12 paginate">
                                            <ul>
                                                <li className="box mx-1" aria-disabled="true"><span><i className="fa fa-caret-left" aria-hidden="true"></i></span></li>
                                                <li className="box mx-1 active"><span>1</span></li>
                                                <li className="box mx-1"><span>2</span></li>
                                                <li className="box mx-1"><span>.</span></li>
                                                <li className="box mx-1"><span>.</span></li>
                                                <li className="box mx-1"><span>.</span></li>
                                                <li className="box mx-1"><span>Last page</span></li>
                                                <li className="box mx-1"><span><i className="fa fa-caret-right" aria-hidden="true"></i></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}


export default Restaurant;