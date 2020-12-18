import React, { Component } from 'react'
import axios from 'axios'

export default class Result extends Component {

    state = {
        links: [],
        pageContent: [],
        content : '',
        page : ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/palabra_x_sitio/' + this.props.match.params.palabra.toLowerCase())
        const seen = new Set();
        var list = res.data.filter(elem => {
            const duplicate = seen.has(elem.sitio);
            seen.add(elem.sitio);
            return !duplicate;
          });
        console.log(list);
        this.setState({ 
            links: list,
            pageContent: list.slice(0, 10),
            content: this.props.match.params.palabra,
            page: 1
        })
    }

    previousPage = () => {
        let page = this.state.page;
        if(page === 1) return null;
        this.setState({ pageContent: this.state.links.slice((page/10), (page/10+10)) });
        page--;
        this.setState({
            page
        }, () => {
            this.scroll();
        });
    }
    
    nextPage = () => {
        let page = this.state.page;
        if((page*10) >= (this.state.links.length)) return null;
        this.setState({ pageContent: this.state.links.slice((page*10), (page*10+10)) });
        page++;
        this.setState({
            page
        }, () => {
            this.scroll();
        });
    }

    scroll = () => {
        const element = document.querySelector('.jumbotron');
        element.scrollIntoView('smooth', 'start')
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    mostrarResultados = () => {

        const res = this.state.links;

        if(res.length === 0) return null;

        return (
            <React.Fragment>
                <div className="list-group">
                    {this.state.pageContent.map(res => (
                        <div className="list-group-item" key={ res.sitio }>
                        <div className="card">
                            <div className="card-header">
                                { res.palabra }
                                <div className="card-body">
                                <a href={ res.sitio } target="_blanck" className="btn btn-secondary btn-block">{ res.sitio }</a>
                                {"tag: " + res.tag}
                                {" | cantidad: " + res.cantidad}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}

                    
                    <div className="py-3">
                        <button onClick={this.previousPage} type="button" className="btn btn-info mr-1">&larr; Anterior</button>
                        <button type="button" className="btn btn-info mr-1" disabled>{this.state.page}</button>
                        <button onClick={this.nextPage} type="button" className="btn btn-info">Siguiente &rarr;</button>
                    </div>

                </div> 
                
            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                <div className="list-group">
                    { this.mostrarResultados() }
                </div> 
            </React.Fragment>
        );
    }
}