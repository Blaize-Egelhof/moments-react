import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect('loggedIn')
    const [signUpData,setSignUpData] = useState({
      username:'',
      password1:'',
      password2:'',
    })

    const{username,password1,password2} =signUpData;
    const [errors, setErrors] = useState({});

    const handleChange = (event) =>{
      setSignUpData({
        ...signUpData,
        // Key : Value , basically this creates a target name and then binds the value of the inputted name field
        [event.target.name]:event.target.value
      })
    }

    const history = useHistory()

    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        await axios.post('/dj-rest-auth/registration/', signUpData)
        history.push('/signin')
      }catch(err){
        setErrors(err.response?.data)
      }
    }


  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit= {handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control type="text" placeholder="username" 
                name='username' className={styles.Input} value={username} onChange={handleChange}/>
              </Form.Group>

              {errors.username?.map((message, idx) => {
                return <Alert variant='warning' key={idx}>{message}</Alert>;
              })}


              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password1" className={styles.Input} value={password1} onChange={handleChange} />
              </Form.Group>

              {errors.password1?.map((message, idx1) => {
                return <Alert variant='warning' key={idx1}>{message}</Alert>;
              })}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="password2" className={styles.Input} value={password2} onChange={handleChange} />
              </Form.Group>

              {errors.password2?.map((message, idx2) => {
                return <Alert variant='warning' key={idx2}>{message}</Alert>;
              })}

              <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                Sign Up
              </Button>
                {/* This checks if the two password fields match , idk how it works , but im assuming specifying 2 password inputs in a form will default to confirmation of password */}
              {errors.non_field_errors?.map((message,idx) =>{
                return <Alert variant='warning' key={idx} className="mt-3">{message}</Alert>;
              })}
        </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;