import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InputForm.css";
import { isClose, addList, updateList, buttonValue } from "../../action/actions";
import axios from 'axios'

const InputForm = props => {
  const close = useSelector(state => state.close);
  const buttonAction = useSelector(state => state.button);
  const allData = useSelector(state => state.allData)
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [contact, setContact] = useState("");
  const [loader, setLoader] = useState(false)

  const isClosed = () => {
    dispatch(isClose(true));
  };

  const onSubmit = e => {
    setLoader(true)
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (buttonAction === "New") {
      console.log(loader)
      let obj = {};
      obj.firstName = firstName;
      obj.lastName = lastName;
      obj.address1 = address1;
      obj.address2 = address2;
      obj.town = town;
      obj.region = region;
      obj.country = country;
      obj.postCode = postCode;
      obj.contactNumber = contact;

      let url = `https://haud-df1ed.firebaseio.com/users.json`
      axios
      .post(url, obj, config)
      .then(res => {
        dispatch(addList(obj, res.data.name));
        dispatch(buttonValue(""))
      })
      .catch(err => {
        alert('Something is wrong :(')
      });

    } else {
      let obj = {};
      obj.firstName = firstName;
      obj.lastName = lastName;
      obj.address1 = address1;
      obj.address2 = address2;
      obj.town = town;
      obj.region = region;
      obj.country = country;
      obj.postCode = postCode;
      obj.contactNumber = contact;

      let url = `https://haud-df1ed.firebaseio.com/users/${props.uid}.json`
      axios
      .put(url, obj, config)
      .then(res => {
        dispatch(updateList(obj, props.uid));
        dispatch(buttonValue(""))
      })
      .catch(err => {
        alert('Something is wrong :(')
      });
    }
    setLoader(false)
  };

  useEffect(() => {
    if (buttonAction === "Edit") {
      var obj = allData[`${props.uid}`]
      setFirstName(obj.firstName);
      setLastName(obj.lastName);
      setAddress1(obj.address1);
      setAddress2(obj.address2);
      setTown(obj.town);
      setRegion(obj.region);
      setCountry(obj.country);
      setPostCode(obj.postCode);
      setContact(obj.contactNumber);
    } else {
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setTown("");
      setRegion("");
      setCountry("");
      setPostCode("");
      setContact("");
    }
  },[allData,buttonAction,props.uid]);

  return (
    <div className={close === false ? "inputform-container" : "invisible"}>
      <form className = {loader === false ? "form": "invisible"} onSubmit={onSubmit}>
        <p className="record-close-button" onClick={isClosed}>
          &#10005;
        </p>
        <h2>{props.work} Record</h2>
        <label>
          First Name:
          <input
            className="record-input"
            type="text"
            name="first-name"
            placeholder="First Name"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            className="record-input"
            type="text"
            name="last-name"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </label>
        <label>
          Address 1:
          <input
            className="record-input"
            type="text"
            name="addess1"
            placeholder="Address 1"
            required
            value={address1}
            onChange={e => setAddress1(e.target.value)}
          />
        </label>
        <label>
          Address 2:
          <input
            className="record-input"
            type="text"
            name="addess2"
            placeholder="Address 2"
            value={address2}
            onChange={e => setAddress2(e.target.value)}
          />
        </label>
        <label>
          Town:
          <input
            className="record-input"
            type="text"
            name="town"
            placeholder="Town"
            required
            value={town}
            onChange={e => setTown(e.target.value)}
          />
        </label>
        <label>
          Region:
          <input
            className="record-input"
            type="text"
            name="region"
            placeholder="Region"
            required
            value={region}
            onChange={e => setRegion(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            className="record-input"
            type="text"
            name="country"
            placeholder="Country"
            required
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </label>
        <label>
          Post Code:
          <input
            className="record-input"
            type="text"
            name="post-code"
            placeholder="Post Code"
            required
            value={postCode}
            onChange={e => setPostCode(e.target.value)}
          />
        </label>
        <label>
          Contact Number:
          <input
            className="record-input"
            type="text"
            name="contact"
            placeholder="Contact Number"
            required
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
        </label>
        <input className="save-button" type="submit" value="Save" />
      </form>
      <div className={loader === true? "lds-roller": "invisible"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default InputForm;
