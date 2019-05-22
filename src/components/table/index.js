import React, {Fragment} from 'react' 
import {crudBuilder} from '../../services/http'
import {InputGroup, FormControl, Table} from 'react-bootstrap'

export default class TableN extends React.Component{
    state={
        search:'',
        dataS:[],
        staticData: [],
        
    }

    async componentDidMount(){
        const response = await crudBuilder('Mr-Hamster/server/data').get()
        this.setState({dataS: response.data, staticData: response.data})
    }

    searching = (value) =>{
        const{staticData} = this.state;
        if(value === ''){
            this.setState({dataS: staticData})
        }
        else{
            const str = value.toLowerCase();
            const dataFiltered = staticData.filter(item => item.name.toLowerCase().includes(str))
            this.setState({dataS: dataFiltered})  
            
        }
    }

    handleChange = ( {target: {value} }) => {
        this.setState({
            search: value,
        })
        this.searching(value)
    }

    render(){
        return(
            <Fragment>
                <InputGroup className="mb-3" style={{width: "50%"}}>
                    <FormControl aria-describedby="basic-addon1" placeholder='Search by name...' onChange={this.handleChange}/>
                </InputGroup>
                <Table striped bordered hover variant="dark" style={{width: "95%"}}>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    { (this.state.dataS == '') ? (
                        <tbody>
                            <tr>
                                <th colSpan="4" style={{textAlign : 'center'}}>No results</th>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                        {
                            this.state.dataS.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.price}</th>
                                    <th>{item.quantity}</th>
                                </tr>
                            ))
                        }
                        </tbody>) 
                    }
                </Table>
            </Fragment>
        );
    }
}