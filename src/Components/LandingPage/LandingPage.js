import React, { Component } from "react";
import "./LandingPage.css";
import { connect } from "react-redux";
import InputForm from "../InputForm/InputForm";
import {
  isClose,
  buttonValue,
  deleteValue,
  allValue,
  isLoading
} from "../../action/actions";
import axios from "axios";

class LandingPage extends Component {
  state = {
    uid: 0
  };

  componentDidMount() {
    this.props.isLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const url = "https://haud-df1ed.firebaseio.com/users.json";

    axios
      .get(url, config)
      .then(res => {
        this.props.allValue(res.data);
        this.props.isLoading(false)
      })
      .catch(err => {
        alert('Something is wrong :(')
      });
  }

  onAddNew = () => {
    this.props.buttonValue("New");
    this.props.isClose(false);
  };

  onEdit = uid => {
    this.setState({ uid });
    this.props.buttonValue("Edit");
    this.props.isClose(false);
  };

  onDelete = id => {
    this.props.isLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const url = `https://haud-df1ed.firebaseio.com/users/${id}.json`;

    axios
      .delete(url, config)
      .then(res => {
        alert("Deleted!!")
        this.props.deleteValue(id)
      })
      .catch(err => {
        alert('Something is wrong :(')
      });
  }

  render() {
    return (
      <div className="landing-page-container">
        <div className="top-header">
          <h4>User Details</h4>
          <button onClick={this.onAddNew} className="add-new-button">
            Add New
          </button>
        </div>
        <div
          className={
            this.props.allID.length === 0 ? "null-list-container" : "invisible"
          }
        >
          Add New Details
        </div>
        <div
          className={
            this.props.allID.length !== 0 ? "list-container" : "invisible"
          }
        >
          {this.props.allID.map(element => {
            return (
              <div key={element} className="list-details">
                <div className="list-details-header">
                  <button
                    onClick={() => this.onEdit(element)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.onDelete(element)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
                <h4>
                  <span>Name:</span>{" "}
                  {this.props.allData[`${element}`].firstName}{" "}
                  {this.props.allData[`${element}`].lastName}
                </h4>
                <h4>
                  <span>Address:</span>{" "}
                  {this.props.allData[`${element}`].address1}{" "}
                  {this.props.allData[`${element}`].address2}{" "}
                  {this.props.allData[`${element}`].town}{" "}
                  {this.props.allData[`${element}`].region}{" "}
                  {this.props.allData[`${element}`].country}{" "}
                  {this.props.allData[`${element}`].postCode}
                </h4>
                <h4>
                  <span>Contact Number:</span>{" "}
                  {this.props.allData[`${element}`].contactNumber}
                </h4>
              </div>
            );
          })}
        </div>
        <InputForm work={this.props.button} uid={this.state.uid} />
          <div className = {this.props.loading === true ? "loading-page": "invisible"}>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    close: state.close,
    button: state.button,
    allID: state.allID,
    allData: state.allData,
    loading: state.loading
  };
};

export default connect(mapStateToProps, {
  isClose,
  buttonValue,
  deleteValue,
  allValue,
  isLoading
})(LandingPage);
