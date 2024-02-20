import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { loginUser } from '../services/UserService';
import Alert from 'react-bootstrap/Alert';
import { useAuthDispach } from '../context/authContext';

const Login = ()  => {

    const [email, setEmail ] = useState("");
    const [password , setPassword ] = useState("");
    const [error,  setError ] = useState("");
    const [sendingData, setSendingData] = useState(false);

    const authDispatch = useAuthDispach();

    const login = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        try{
            setSendingData(true);
            setError("");
            console.log(email+password);
            const res  = await loginUser(email,password);
            const token = res.data.token;
            authDispatch({
                type: "login",
                token    
            })
            setSendingData(false);
        }catch(errors : any){

            if(errors.response){
                errors.response.status === 403 && setError("No se puede iniciar Sesion con esas credenciales");    
            }
           
            setSendingData(false);
        }
    }

    return (
        <Container>
            <Row>
                <Col lg ="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Iniciar Sesion</h4><hr/>
                            <Form onSubmit={login}>
                                
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control   
                                    type="email" placeholder="e.g JohnDoe@email.com"
                                    value={email}
                                    onChange={ e => setEmail(e.target.value)}
                                    ></Form.Control>  
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                    type="password" placeholder="********"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value)}
                                    ></Form.Control>
                                    
                                </Form.Group>
                                <Button type="submit">
                                    { sendingData ? <>
                                        <Spinner as="span"animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            >
                                            </Spinner>&nbsp;   
                                            <span className="visually-hidden">Iniciando Sesion...</span>
                                       
                                     </>:
                                    <>  Iniciar Sesion </>
                                    }
                                </Button>
                            </Form>
                             <Alert className="mt-4"  show={!!error} variant="danger">{error}</Alert>       

                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
        </Container>
    )

}
export default Login;