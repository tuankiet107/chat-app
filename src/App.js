import React, { Component } from 'react';

class App extends Component{
    render(){
        return(
            <div>
                <h2>Hello world</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default App;