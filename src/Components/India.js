import React, { Component } from 'react'
import {Card} from 'react-bootstrap'
import States from './States'
import axios from 'axios'

export default class India extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: ''
        }
    }
    
    componentDidMount(){
        axios.get('https://corona.lmao.ninja/v2/countries/india')
        .then(res => this.setState({
            data: res.data
        }))
    }


    render() {
        let {cases, active, deaths, recovered, todayCases, todayDeaths} = this.state.data
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <img src="https://www.countryflags.io/in/flat/64.png" alt='india-flag'/>
                </div>
                <div className='col-md-12'>
                    <div className='row '>
                        <div className='col-md-3'>
                            <Card className='badge badge-info' style={{ width: '18rem' }}>
                                <Card.Body className='text-center'>
                                    <Card.Title>TOTAL CASES </Card.Title>
                                    <h3>{cases}</h3>
                                    <Card.Text>
                                        NEW CASES: {todayCases}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-3'>
                            <Card className='badge badge-warning' style={{ width: '18rem' }}>
                                <Card.Body className='text-center'>
                                    <Card.Title>ACTIVE CASES </Card.Title>
                                    <h3>{active}</h3>
                                    
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-3'>
                            <Card className='badge badge-success' style={{ width: '18rem' }}>
                                <Card.Body className='text-center'>
                                    <Card.Title>RECOVERED CASES </Card.Title>
                                    <h3>{recovered}</h3>
                                    
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-3'>
                            <Card className='badge badge-danger' style={{ width: '18rem' }}>
                                <Card.Body className='text-center'>
                                    <Card.Title>TOTAL DEATH </Card.Title>
                                    <h3>{deaths}</h3>
                                    <Card.Text>
                                        TODAY: {todayDeaths}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 my-3'>
                    <States />
                </div>
            </div>
        )
    }
}
