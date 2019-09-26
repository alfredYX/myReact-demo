import React from 'react';
import { Link } from 'react-router-dom'
import { Button,Icon,Table,Input} from 'antd';
class Page3 extends React.Component{
    state = {
        size: 'large',
        tableData:[],
        searchName:''
      };
    
        getData(name){
            fetch(`http://127.0.0.1:8081/shop/get?name=${name || ''}`,{
            method: 'GET'
            }).then(res => res.json()).then(
            data => {
                this.setState({tableData:data.data})
            }
            ).catch(e => console.log('错误:', e))
        }   
        
        inputNameHandle(event){
            this.setState({searchName:event.target.value})
        }

        searchParam(){
            this.getData(this.state.searchName)
        }

        componentWillMount(){
            this.getData()
        }
render(){
    const size = this.state.size
    const columns = [{
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
      },{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      }, {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      }];
    let inputStyle={
        width:'150px'
    }
    return(
    <div>
        <div>This is Page3!</div>
        <Link to='/'>
            <Button type="primary" size={size}><Icon type="rollback" />返回</Button>
        </Link>
        <Input style={inputStyle} value={this.state.searchName} onChange={ (ev) => {this.inputNameHandle(ev)}} placeholder="请输入" /> <Button type="primary" onClick={ () => {this.searchParam()}}>查询</Button>
        <Table rowKey="_id" pagination={{ pageSize: 5 }} dataSource={this.state.tableData} columns={columns}/>
    </div>
    )
}
}

export default Page3
