import React, { Component } from "react";
import "./Header.css";
import SvgIcon from "@material-ui/core/SvgIcon";
// import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
// import TextField from "@material-ui/core/TextField";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";

import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
// import { Link } from "react-router-dom";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import request from 'request';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const formControlWidth = { width: 400 };
const TabContainer = function(props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      usernameRequired: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contact: ""
    };
    this.loginClickHandler = this.loginClickHandler.bind(this);
  }


  componentDidMount() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData !== null) {
      debugger;
      this.setState({
        loggedIn: true,
        loginResponse: JSON.parse(userData),
      })
    }
  }



  openModalHandler = () => {
    this.setState({
      modalIsOpen: true,
      value: 0,
      usernameRequired: "dispNone",
      userNameRegEx: "dispNone",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPasswordRegEx: "dispNone",
      loginPassword: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      emailRegEx: "dispNone",
      email: "",
      registerPasswordRequired: "dispNone",
      registerPasswordRegEx: "dispNone",
      registerPassword: "",
      contactRequired: "dispNone",
      contactRegEx: "dispNone",
      contact: "",
      isRegSuccess: true,
      isLoginSuccess: true,
      regErrorMsg: "dd",
      loginErrMsg: "",
      isDisplayRegSnackBox: false,
      isDisplayLoginSnackBox: false,
      loginResponse: {},
      anchorEl: null,
      loggedIn: sessionStorage.getItem("access-token") != null
    });
  };

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value: value });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  loginClickHandler = () => {
    this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
    this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
    this.validateContactNumber(this.state.username) === false && this.state.username !== "" ? this.setState({ userNameRegEx: "dispBlock" }) : this.setState({ userNameRegEx: "dispNone" });

    if (this.state.username === "" || this.state.loginPassword === "" || this.validateContactNumber(this.state.username) === false) {
      return;
    }
  //   fetch(`${this.props.baseurl}/customer/login`, {
  //     method: 'POST',
  //     headers: {
  //       "authorization": "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword),
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   .then(res => {
  //     sessionStorage.setItem("access-token", res.headers['access-token'])
  //     return res.json()})
  //   .then(res => {
  //     if (res.email_address) {
  //       this.setState({
  //         loggedIn: true,
  //         isLoginSuccess: true,
  //         loginErrMsg: "",
  //         loginResponse: res,
  //         isDisplayLoginSnackBox: true,
  //         isDisplayLoginSnackBox: true
  //       })
  //       setTimeout(() => {
  //         this.setState({ isDisplayLoginSnackBox: false });
  //       }, 3000);
  //       this.closeModalHandler();
  //     } else if (res.status === 401) {
  //       this.setState({
  //         isLoginSuccess: false,
  //         loginErrMsg: res.message
  //       });
  //     }
    
  // })

    const dataLogin = null;
    let xhrLogin = new XMLHttpRequest();
    const context1 = this;
    const accessToken = window.btoa(this.state.username + ":" + this.state.loginPassword);
    xhrLogin.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
        debugger;
        sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

        context1.setState({
          loggedIn: true
        });
        context1.setState({
          isLoginSuccess: true
        });
        context1.setState({
          loginErrMsg: ""
        });
        context1.setState({ loginResponse: JSON.parse(this.responseText) });
        sessionStorage.setItem("userData",  JSON.stringify(this.responseText));
        context1.setState({ isDisplayLoginSnackBox: true });

        setTimeout(function() {
          context1.setState({ isDisplayLoginSnackBox: false });
        }, 3000);
        context1.closeModalHandler();
      } else if (this.readyState === 4 && this.status === 401) {
        console.log(this);
        context1.setState({
          isLoginSuccess: false
        });
        context1.setState({
          loginErrMsg: JSON.parse(this.responseText).message
        });
      }
    });
    xhrLogin.open("POST", this.props.baseurl + "/customer/login");
    xhrLogin.setRequestHeader("authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
    // xhrLogin.setRequestHeader("Content-Type", "application/json");
    // xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send(dataLogin);
  };

  inputUsernameChangeHandler = e => {
    this.setState({ username: e.target.value });
  };

  inputLoginPasswordChangeHandler = e => {
    this.setState({ loginPassword: e.target.value });
  };
  logoutHandler = e => {
    const dataLogin = null;
    let xhrLogin = new XMLHttpRequest();
    const context1 = this;
    xhrLogin.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this);
        console.log(this.responseText);
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        context1.setState({
          loggedIn: false
        });
      } else {
        console.log(this);
      }
    });
    xhrLogin.open("POST", this.props.baseurl + "/customer/logout");
    xhrLogin.setRequestHeader("authorization", "Bearer " + sessionStorage.getItem("access-token"));
    // xhrLogin.setRequestHeader("Content-Type", "application/json");
    // xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send(dataLogin);
  };
  registerClickHandler = () => {
    this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
    // this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
    this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
    this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
    this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
    this.validateEmail() === false && this.state.email !== "" ? this.setState({ emailRegEx: "dispBlock" }) : this.setState({ emailRegEx: "dispNone" });
    this.validateContactNumber(this.state.contact) === false && this.state.contact !== "" ? this.setState({ contactRegEx: "dispBlock" }) : this.setState({ contactRegEx: "dispNone" });
    this.validatePassword() === false && this.state.registerPassword !== "" ? this.setState({ registerPasswordRegEx: "dispBlock" }) : this.setState({ registerPasswordRegEx: "dispNone" });

    if (
      this.state.firstname === "" ||
      this.state.email === "" ||
      this.state.registerPassword === "" ||
      this.state.contact === "" ||
      this.validateEmail() === false ||
      this.validateContactNumber(this.state.contact) === false ||
      this.validatePassword() === false
    ) {
      console.log("return");
      return;
    }

    let dataSignup = {
      contact_number: this.state.contact,
      email_address: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      password: this.state.registerPassword
    };

    const context1 = this;
    let xhrSignup = new XMLHttpRequest();
    let that = this;
    xhrSignup.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 201) {
        that.setState({
          registrationSuccess: true
        });
        context1.setState({
          isRegSuccess: true
        });
        context1.setState({
          regErrorMsg: ""
        });
        context1.setState({ isDisplayRegSnackBox: true });
        context1.setState({ value: 0 });
        setTimeout(function() {
          context1.setState({ isDisplayRegSnackBox: false });
        }, 3000);
      } else if (this.readyState === 4 && this.status === 400) {
        console.log(this);
        context1.setState({
          isRegSuccess: false
        });
        context1.setState({
          regErrorMsg: JSON.parse(this.responseText).message
        });
      }
    });

    xhrSignup.open("POST", this.props.baseurl + "/customer/signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    //xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.send(JSON.stringify(dataSignup));
  };
  validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  };
  validateContactNumber = contact => {
    var re = /^(([1-9]{1})[0-9]{9})$/;
    return re.test(String(contact).toLowerCase());
  };

  validatePassword = () => {
    var re = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\W).*$/;
    return re.test(String(this.state.registerPassword));
  };

  inputFirstNameChangeHandler = e => {
    this.setState({ firstname: e.target.value });
  };

  inputLastNameChangeHandler = e => {
    this.setState({ lastname: e.target.value });
  };

  inputEmailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };

  inputRegisterPasswordChangeHandler = e => {
    this.setState({ registerPassword: e.target.value });
  };

  inputContactChangeHandler = e => {
    this.setState({ contact: e.target.value });
  };
  handleMyProfile = e => {
    console.log("My profile handler called");
    /* Link profile page here after creation  */
  };
  render() {
    const shouldShowSearchBar = this.state.loggedIn && window.location.href.split("/")[3] === "";
    return (
      <div>
        <header className="app-header">
          <a href="/"><SvgIcon {...this.props}>
            <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </SvgIcon>
          </a>
          {(shouldShowSearchBar) &&
          <span className="header-search-box">
            <FilledInput
              id="outlined-basic"
              placeholder="Search by Restaurant Name"
              variant="outlined"
              startAdornment={
                <InputAdornment variant="standard" position="start" id="searchBoxIcon">
                  <SvgIcon {...this.props}>
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </SvgIcon>
                </InputAdornment>
              }
              onChange={ this.props.onsearchtextChanged}
            />
          </span>
          }   
          {!this.state.loggedIn && (
            <Button variant="contained" color="default" className="header-button" onClick={this.openModalHandler}>
              <AccountCircleIcon />
              Login
            </Button>
          )}
          {this.state.loggedIn && (
            <Button variant="contained" color="default" className="header-button header-profile-button" onClick={this.handleClick}>
              <AccountCircleIcon />
              {this.state.loginResponse["first_name"]}
            </Button>
          )}

          <Menu id="simple-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)}>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleMyProfile();
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.logoutHandler();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          {/*<Button variant="contained" color="primary" onClick={this.logoutHandler}>
            Logout
          </Button>*/}
          <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
            <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>

            {this.state.value === 0 && (
              <TabContainer style={{ paddingLeft: 0 }}>
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="username">Contact No.</InputLabel>
                  <Input id="username" type="text" value={this.state.username} username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                  <FormHelperText className={this.state.usernameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.userNameRegEx}>
                    <span className="red">Invalid Contact</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="loginPassword">Password</InputLabel>
                  <Input id="loginPassword" type="password" value={this.state.loginPassword} loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                  <FormHelperText className={this.state.loginPasswordRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                {this.state.isLoginSuccess === false && (
                  <div>
                    <FormHelperText>
                      <span className="red">{this.state.loginErrMsg}</span>
                    </FormHelperText>
                    <br />
                  </div>
                )}

                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                  LOGIN
                </Button>
              </TabContainer>
            )}

            {this.state.value === 1 && (
              <TabContainer>
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="firstname">First Name</InputLabel>
                  <Input id="firstname" type="text" value={this.state.firstname} firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                  <FormHelperText className={this.state.firstnameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl style={formControlWidth}>
                  <InputLabel htmlFor="lastname">Last Name</InputLabel>
                  <Input id="lastname" type="text" value={this.state.lastname} lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                </FormControl>
                <br />
                <br />
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" type="text" value={this.state.email} email={this.state.email} onChange={this.inputEmailChangeHandler} />
                  <FormHelperText className={this.state.emailRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.emailRegEx}>
                    <span className="red">Invalid Email</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="registerPassword">Password</InputLabel>
                  <Input id="registerPassword" type="password" value={this.state.registerPassword} registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                  <FormHelperText className={this.state.registerPasswordRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.registerPasswordRegEx}>
                    <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required style={formControlWidth}>
                  <InputLabel htmlFor="contact">Contact No.</InputLabel>
                  <Input id="contact" type="text" value={this.state.contact} contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                  <FormHelperText className={this.state.contactRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.contactRegEx}>
                    <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                {this.state.isRegSuccess === false && (
                  <div>
                    <FormHelperText>
                      <span className="red">{this.state.regErrorMsg}</span>
                    </FormHelperText>
                    <br />
                  </div>
                )}
                <Button variant="contained" color="primary" onClick={this.registerClickHandler}>
                  SIGNUP
                </Button>
              </TabContainer>
            )}
          </Modal>
          {this.state.isDisplayLoginSnackBox && (
            <div style={{ maxWidth: "400px" }} className="snackbox">
              <SnackbarContent message="Logged in successfully!" />
            </div>
          )}
          {this.state.isDisplayRegSnackBox && (
            <div style={{ maxWidth: "400px" }} className="snackbox">
              <SnackbarContent message="Registered successfully! Please login now!" />
            </div>
          )}
        </header>
      </div>
    );
  }
}
export default Header;
