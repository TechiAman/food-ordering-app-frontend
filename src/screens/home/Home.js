import React, { Component } from "react";
import Header from "../../common/header/Header";
import "../home/Home.css";
// import "../../font-awesome-4.7.0/font-awesome-4.7.0/css/font-awesome.min.css"
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

class Home extends Component {
  currentIndex = 0;
  constructor() {
    super();
    this.state = {
      restaurantDetails: [],
      accessToken: sessionStorage.getItem("access-token")
    };
  }
  componentWillMount() {
    this.fetchAllRestaurants();
  }
  fetchAllRestaurants() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let context = this;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        const restDetails = JSON.parse(this.responseText).restaurants;
        context.setState({ restaurantDetails: restDetails });
        console.log(context.state.restaurantDetails);
      }
    });
    xhr.open("GET", this.props.baseUrl + "/restaurant");
    xhr.send(data);
  }
  onSearchTextChangedHandler = e => {
    console.log("Function invoked", e.target.value, e.value);
    const searchVal = e.target.value;
    if (searchVal.trim().length === 0) {
      this.fetchAllRestaurants();
      return;
    }
    let data = null;
    let xhr = new XMLHttpRequest();
    let context = this;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        const restDetails = JSON.parse(this.responseText).restaurants;
        context.setState({ restaurantDetails: restDetails });
        console.log(context.state.restaurantDetails);
      }
    });
    xhr.open("GET", this.props.baseUrl + "/restaurant/name/" + searchVal);
    xhr.send(data);
  };
  onRestaurantClicked = restaurantId => {
    console.log(restaurantId);
    /* ENable below routing after restaurant detail page is developed */
    this.props.history.push('/restaurant/' + restaurantId);
  };
  render() {
    // let index=0;
    return (
      <div>
        {/* <Header baseurl={this.props.baseUrl} onsearchtextChanged={this.onSearchTextChangedHandler} parentpage={"Home"} /> */}
        <br />
        <div className="listFlex">
          {this.state.restaurantDetails && this.state.restaurantDetails.map((restaurant, index) => (
            <div className="flexTile" key={restaurant.id} style={{ cursor: "pointer" }}>
              <Card onClick={() => this.onRestaurantClicked(restaurant.id)}>
                <CardMedia style={{ width: "400px", height: "200px" }} title={restaurant.restaurant_name} image={restaurant.photo_URL}>
                  <img src={restaurant.photo_URL} alt={restaurant.restaurant_name} className="restaurantImage" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5">{restaurant.restaurant_name}</Typography>
                  <br />
                  <div className="restaurantCategories">
                    {restaurant.categories.split().map((category, i) => (
                      <Typography variant="body1" key={index + "category" + i}>
                        <small >{category},</small>
                      </Typography>
                    ))}
                  </div>
                  <br />
                  <div className="restaurantDetail">
                    <div className="restaurantRatingSection">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      &nbsp;&nbsp;{restaurant.customer_rating}&nbsp;&nbsp; ({restaurant.number_customers_rated})
                    </div>
                    <div style={{ float: "right" }}>
                      <i className="fa fa-rupee"></i>
                      {restaurant.average_price} for two
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
