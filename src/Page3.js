import React from 'react';
import { Link } from 'react-router-dom'
import { Button,Icon } from 'antd';
class Page3 extends React.Component{
    state = {
        size: 'large',
      };
render(){
    const size = this.state.size
    return(
    <div>
        <div>This is Page3!</div>
        <Link to='/'>
            <Button type="primary" size={size}><Icon type="rollback" />返回</Button>
        </Link>
    </div>
    )
}
}

export default Page3
