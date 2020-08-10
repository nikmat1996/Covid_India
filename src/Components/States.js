import React, { Component } from 'react'
import axios from 'axios'
import {Accordion, Card} from 'react-bootstrap'

export class States extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/state_district_wise.json')
        .then(res => this.setState({
            data: res.data
        }))
    }
    
    render() {
        let stateNames = Object.keys(this.state.data)
        stateNames.shift()
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <Accordion defaultActiveKey="0">
                        {
                            stateNames.map(item => {
                                let districtsObj = this.state.data[item].districtData
                                let districtNames = Object.keys(districtsObj)
                                let totalActive = 0
                                let totalConfirmed = 0
                                let totalRecovered = 0
                                let totalDeath = 0

                                districtNames.forEach(district => {
                                    totalActive += districtsObj[district].active
                                    totalConfirmed += districtsObj[district].confirmed
                                    totalRecovered += districtsObj[district].recovered
                                    totalDeath += districtsObj[district].deceased
                                })

                                return (
                                    <Card key= {item}>
                                        <Accordion.Toggle as={Card.Header} eventKey={item} style= {{display: 'flex'}}>
                                        <div style={{flex: 2}}>{item}</div>
                                        <div style={{flex: 1}}>Total Cases : {totalConfirmed}</div>
                                        <div style={{flex: 1}}>Active Cases : {totalActive}</div>
                                        <div style={{flex: 1}}>Recovered : {totalRecovered}</div>
                                        <div style={{flex: 1}}>Deaths : {totalDeath}</div>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={item}>
                                        <Card.Body>
                                            <table className='table table-bordered table-striped table-hover table-dark' >
                                                <thead>
                                                    <tr>
                                                        <td>District</td>
                                                        <td>Confirmed</td>
                                                        <td>Active</td>
                                                        <td>Recovered</td>
                                                        <td>Deaths</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {districtNames.map(district => (
                                                        <tr key={district}>
                                                            <td>{district}</td>
                                                            <td>{districtsObj[district].confirmed}</td>
                                                            <td>{districtsObj[district].active}</td>
                                                            <td>{districtsObj[district].recovered}</td>
                                                            <td>{districtsObj[district].deceased}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })
                        }
                    </Accordion>
                </div>
                
            </div>
        )
    }
}

export default States
