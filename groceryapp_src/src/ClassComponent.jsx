import React,{Component}from 'react';
class ClassComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            message:'here is a simple class component'
        }
    }
    changeMessage=()=>{
        this.setState({
            message:'Message have changed'
        })
    };
    render(){
        return(
            <div>
                <h2> class Component</h2>
                <p>{this.state.message}</p>
                <button onClick={this.changeMessage}>Change</button>
            </div>
        )
    }
}
export default ClassComponent;
