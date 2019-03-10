import React from 'react';
import { Link } from 'react-router-dom'
import  "./page1.css"

class Page1 extends React.Component{
render(){
    let page1Style={
    
}
return(
<div>
    <div className="page1Style" style={page1Style}>This is Page1!</div>
<div>
            <Link to="/">
            <div>返回</div>
            </Link>
</div>
</div>
)
}
}

export default Page1
