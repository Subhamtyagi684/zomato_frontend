import React, { Component, Fragment } from 'react';
import '../styles/index.css';
import axios from 'axios';
import {useParams} from 'react-router-dom' ;


function RestaurantList(item){
    return (
        <div className="row item-boxes mb-4">
            <div className="col-xl-3 col-lg-5 col-md-5">
                <img src="./images/shutterstock_1154073754@3x.png" width="100%" height="100%" />
            </div>
            <div className="col-xl-9 col-lg-7 col-md-7">
                <h3>The Big Chill Cakery</h3>
                <h4>Fort</h4>
                <p>Shop 1, Plot D, Samruddhi Complex, chincholi, New Delhi</p>
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
                            <td>Bakery</td>
                        </tr>
                        <tr>
                            <th>COST FOR TWO (in Rupees)</th>
                            <td>:</td>
                            <td>2700</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}