import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            navList:[
                {page:'/Page1',key:1,name:'page1'},
                {page:'/Page2',key:2,name:'page2'},
                {page:'/Page3',key:3,name:'page3'}
            ]
        }
    }
    render(){
    return(
    <div>
        <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            mode="vertical"
        >
        {this.state.navList.map( (item,index) => {
             return <Menu.Item key={index+1}>
                        <Link to={item.page} key={index+1}>
                            <div>点击跳转到{item.name}</div>
                        </Link>
                     </Menu.Item>
        })}
        </Menu>
    </div>
    );
    }
    }
    
    export default Home
    