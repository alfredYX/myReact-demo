import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    render(){
    return(
    <div>
        <div>This is Home!</div>
        <div>
            <Link to="/Page1/" style={{color:'red'}}>
            <div>点击跳转到Page1</div>
            </Link>
            <Link to="/Page2/" style={{color:'blue'}}>
            <div>点击跳转到Page2</div>
            </Link>
            <Link to="/Page3/" style={{color:'black'}}>
            <div>点击跳转到Page3</div>
            </Link>
        </div>
    </div>
    );
    }
    }
    
    export default Home
