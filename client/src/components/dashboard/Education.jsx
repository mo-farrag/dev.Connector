import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.current ? " Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      education.length !== 0 && (
        <div>
          <h4 className="mb-4">Education</h4>
          <table className="table">
            <thead>
              <tr>
                <td>Company</td>
                <td>Title</td>
                <td>Years</td>
                <td></td>
              </tr>
            </thead>
            {education}
          </table>
        </div>
      )
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
