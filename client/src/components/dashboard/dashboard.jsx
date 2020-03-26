import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    console.log("test");

    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, isLoading } = this.props.profile;
    let dashboardContent;

    if (profile === null || isLoading) {
      dashboardContent = <h4>Loading ...</h4>;
    } else {
      dashboardContent = <h1>Hello</h1>;
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">{dashboardContent}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//add functions and object to PropTypes of the component
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth, // based on names in authReducer, but key can be anything,
  errors: state.errors // get errors object from errorsReducer
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
