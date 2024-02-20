import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { loginUser, registerUser } from '../services/UserService';
import { Spinner } from 'react-bootstrap';
import { useAuthDispach } from '../context/authContext';


const Register = ()  => {

    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password , setPassword ] = useState("");
    const [errors,  setErrors ] = useState<any>({});
    const [sendingData, setSendingData] = useState(false);

    const authDispatch = useAuthDispach();

    const register = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        try{
            setSendingData(true);
            await registerUser(name,email,password); 
            const res  = await loginUser(email,password);
            const token = res.data.token;
            authDispatch({
                type: "login",
                token    
            })
        }catch(errors : any){
            setErrors(errors.response.data.errors);
            setSendingData(false);
        }
    }

    return (
        <Container>
            <Row>
                <Col lg ="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Crear Cuenta</h4><hr/>
                            <Form onSubmit={register}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        isInvalid={!!errors?.name}
                                        type="text" 
                                        placeholder="e.g John Doe"
                                        value={name}
                                        onChange={ e => setName(e.target.value)}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors?.name}

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control   isInvalid={!!errors?.email} 
                                    type="email" placeholder="e.g JohnDoe@email.com"
                                    value={email}
                                    onChange={ e => setEmail(e.target.value)}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        { errors?.email}

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                    isInvalid={!!errors?.password} 
                                    type="password" placeholder="********"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value)}
                                    ></Form.Control>
                                     <Form.Control.Feedback type="invalid">
                                        { errors?.password}

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit">
                                    { sendingData ? <>
                                        <Spinner as="span"animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            >
                                            </Spinner>&nbsp;   
                                            <span className="visually-hidden">Creando cuenta...</span>
                                       
                                     </>:
                                    <>  Crear Cuenta </>
                                    }
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
        </Container>
    )

}
export default Register;