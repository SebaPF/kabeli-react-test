import React from "react";
import simulatedData from './simulatedData.json'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [simulatedData];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      email: "",
      password: "",
      phone: {
        number: "",
        citycode: "",
        contrycode: ""
      }
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].name = dato.name;
        arreglo[contador].email = dato.email;
        arreglo[contador].password = dato.password;
        arreglo[contador].phone.number = dato.phone;
        arreglo[contador].phone.citycode = dato.citycode;
        arreglo[contador].phone.contrycode = dato.contrycode;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = (dato) => {
    var valorNuevo = {
      name: dato.name,
      email: dato.email,
      password: dato.password,
      phone: {
        number: dato.number,
        citycode: dato.citycode,
        contrycode: dato.contrycode
      }
    };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Add
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.email}</td>
                  <td>{dato.password}</td>
                  <td>{'+' + dato.phone.contrycode + ' ' + dato.phone.citycode + ' ' + dato.phone.number}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Edit
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Edit user</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>

            <FormGroup>
              <label>Email:</label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>

            <FormGroup>
              <label>Password:</label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.password}
              />
            </FormGroup>

            <FormGroup>
              <label>Phone:</label>
              <input
                className="form-control"
                name="phone"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.phone.number}
              />
            </FormGroup>

            <FormGroup>
              <label>City Code Phone:</label>
              <input
                className="form-control"
                name="citycode"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.phone.citycode}
              />
            </FormGroup>

            <FormGroup>
              <label>Country Code Phone:</label>
              <input
                className="form-control"
                name="contrycode"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.phone.contrycode}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Edit
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Add user</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Name:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Email:</label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Password:</label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Phone:</label>
              <input
                className="form-control"
                name="number"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Country Code Phone:</label>
              <input
                className="form-control"
                name="contrycode"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>City Code Phone:</label>
              <input
                className="form-control"
                name="citycode"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar(this.state.form)}>
              Add user
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
