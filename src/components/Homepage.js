import React, { Component, Fragment } from 'react';
import '../styles/index.css';
import axios from 'axios';


class HomePage extends Component{
    constructor(){
        super();
        this.state={
            locations:undefined,
            restaurantByLoc:undefined,
            mealtypes:undefined
        }
    }

    handleLocations = (data) => {
        if(data.length>0){
            return (
                data.map((item)=>{
                    return(
                        <option key={item._id} value={item.location_id}>{item.name}</option>
                    )
                })
            )
        }
    }

    handleLocationChange = (event) =>{
        if(event.target.value!=-1){
            axios({
                method: 'get',
                url: 'http://localhost:5001/restaurant/'+event.target.value,
              })
                .then((response)=> {
                    if(response.status==200){
                        this.setState({
                            restaurantByLoc:response.data,
                          })
                    }
                }).catch(
                    (error)=>{
                        // console.log('Error while fetching location api',error)
                        this.setState({
                            restaurantByLoc:[]
                        })
                    }
                )
        }else{
            this.setState({
                restaurantByLoc:[]
            })
        }
        
    }

    handleRestaurantOptions = (data) => {
        if(data.length>0){
            return (
                data.map((item)=>{
                    return(
                        <option key={item._id} value={item._id}>{item.name},{item.locality},{item.city}</option>
                    )
                })
            )
        }
    }

    handleMealTypes = (data) =>{
        if(data.length>0){
            return(
                data.map((item)=>{
                    return(
                        <div className="col-lg-4 col-md-6 my-3" key={item._id}>
                            <a href={"/restaurants?mealtype_id="+item.meal_type} className="text-decoration-none">
                                <div className="search-menu-box-item">
                                    <div className="item-box">
                                        <div className="image-item">
                                            <img src={item.image}/>
                                        </div>
                                        <div className="description-item">
                                            <h3>{item.name}</h3>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })
            )
        }else{
            return(
                <div>
                    <center>
                        <h2>Sorry, currently there are no mealtypes available.</h2>
                    </center>
                </div>
            )
        }
    }

    componentDidMount(){
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

            axios({
                method: 'get',
                url: 'http://localhost:5001/mealtypes',
              })
                .then((response)=> {
                    if(response.status==200){
                        this.setState({
                            mealtypes:response.data,
                        })
                    }
                  
                }).catch(
                    (error)=>{
                        // console.log('Error while fetching location api',error)
                        this.setState({
                            mealtypes:[],
                        })
                    }
                )
    }

    handleLoading = () => {
        return (
            <div>
                <center>Loading...</center>
            </div>
        )
    }

    componentWillUnmount(){
        this.setState({
            locations:"",
            restaurantByLoc:"",
            mealtypes:""
        })
    }

    render(){
       const {mealtypes,locations,restaurantByLoc} = this.state;
        return(
            <Fragment>
                <section>
                    <div className="banner">
                        <img src="Assets/banner.png" className="banner-poster" alt="banner"/>
                        
                        <div className="banner-jumbotron">
                            <h1>Get <span>Delecious</span> Food Instantly At Your <span>Doorstep</span></h1>
                            <p></p>
                        </div>
                        <div className="search-jumbotron">
                            <div className="search-form">
                                <form>
                                    <h3>Find the best bars and restaurants near you</h3>
                                    <div className="location-type">
                                        <select name='location' onChange={this.handleLocationChange}>
                                            <option value={-1}>Select any location</option>
                                            {locations?this.handleLocations(locations):''}
                                        </select>
                                        <div className="map-search-icon">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="restaurants-search">
                                        <select name='restaurant'>
                                            <option value={-1}>Select any restaurant</option>
                                            {restaurantByLoc?this.handleRestaurantOptions(restaurantByLoc):''}
                                        </select>
                                        <div className="map-search-icon">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="home-search-button">
                                        <button className="search-btn">
                                            Book order
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 quick-searches">
                                <h2>Quick Searches </h2>
                                <p>Discover restaurants by type of meal </p>
                            </div>
                            {mealtypes?this.handleMealTypes(mealtypes):this.handleLoading()}
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default HomePage;