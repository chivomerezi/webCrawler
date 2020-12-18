import React, { Component } from 'react'

export default class Browser extends Component {

    state = {
        search: ''
    }

    /*async componentDidMount() {
        const res = await axios.get('http://localhost:4000/links')
        console.log(res)
    }*/

    /*getLinks = async () => {
        const res = await axios.get('http://localhost:4000/links')
        console.setState({links: res.data})
    }*/

    /*onSubmit = e => {
        e.preventDefault();
        this.getLinks();
    }*/

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    render() {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input onChange={this.onInputChange} name="search" type="text" className="form-control form-control-lg"
                        placeholder="Buscar"/>   
                    </div>
                    <div className="form-group col-md-4">
                        {/*<Link className="nav-link" to={"/" + this.state.search}>
                            <h4 className="card-title">{this.state.search}</h4>
                        </Link>*/}
                        {console.log(this.state.search)}
                        <a value={this.state.search} href={"http://localhost:3000/" + this.state.search} type="submit" className="btn btn-lg btn-dark btn-block">
                            Buscar
                        </a>
                        <a value={this.state.search} href={"http://localhost:3000/" + this.state.search} type="submit" className="btn btn-lg btn-dark btn-block">
                            Voy a tener suerte
                        </a>
                    </div>
                </div>
            </form>       
        );
    }
}