import React from 'react';
import ReviewGrid from "./ReviewGrid";
import {connect} from "react-redux";

class ReviewsView extends React.Component {
    render(){
        let restaurants = this.props.restaurants.map(x => (
            <ReviewGrid name={x.get('name')} bathroom={x.get('bathroom')} staff={x.get('staff')}
                        cleanliness={x.get('cleanliness')} drive={x.get('drive')}
                        delivery={x.get('delivery')} img={URL.createObjectURL(x.get('images').get(0))}/>
        ));
        return <div>
            {restaurants}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state['app'].get('restaurants'),
    }
};

export default (connect(mapStateToProps)(ReviewsView));