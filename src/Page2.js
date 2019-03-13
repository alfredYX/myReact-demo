import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import  "./page2.css"

class Page2 extends React.Component{
    constructor(props){ //构造函数
        super(props);
            this.state = {
                mytext : '',
                myjson : [],
                textInput:'',
                textMoney:''
            }
        }
        getData(){ //请求数据函数
            fetch(`http://127.0.0.1:8081/`,{
            method: 'GET'
            }).then(res => res.text()).then(
            data => {
            this.setState({mytext:data})
            }
            ).catch(e => console.log('错误:', e))
            }

            getJsonData(){ //请求数据函数
                fetch(`http://127.0.0.1:8081/json`,{
                method: 'GET'
                }).then(res => res.json()).then(
                data => {
                    console.info(data)
                    if(data.code === 200){
                        data.data.forEach ( item => {
                            item.editHandle = false
                        })
                        this.setState({myjson:data.data})
                    }else{
                        this.setState({myjson:[]})   
                    }
                }
                ).catch(e => console.log('错误:', e))
                }

                inputNameHandle(event){
                    this.setState({textInput:event.target.value})
                }
                
                inputMoneyHandle(event){
                    this.setState({textMoney:event.target.value})
                }

                addHandle(){
                    let findSameName = this.state.myjson.find ( v => v.name === this.state.textInput)
                    if(findSameName){
                        console.info('不能重复')
                        return 
                    }
                    if(!this.state.textInput || !this.state.textMoney){
                        console.info('请填写')
                        return 
                    }
                    let obj = {
                        name : `${this.state.textInput}`,
                        price : `${this.state.textMoney}`,
                        date : `${moment().format("YYYY年MM月DD日")}`,
                        editHandle:false
                    }
                    this.state.myjson.push(obj)
                    this.setState({myjson:this.state.myjson})

                    this.clearInput()
                }

                clearInput(){
                    this.setState({textInput:'',textMoney:''})
                }

                editHandle(idx){
                    // 为true的时候保存操作 
                    // this.state.myjson[idx].editHandle = !this.state.myjson[idx].editHandle
                    // react 不允许直接修改state属性 要通过setState 所以要先赋值一个新的变量                    
                    let updateMyjson = [...this.state.myjson]
                    updateMyjson[idx].editHandle = !updateMyjson[idx].editHandle
                    this.setState({myjson:updateMyjson})
                }
                
                itemInputHandle(ev,idx){
                    let updateMyjson = [...this.state.myjson]
                    updateMyjson.name = ev.target.value
                    this.setState({myjson:updateMyjson})
                }

                delHandle(idx){
                    this.state.myjson.splice(idx,1)
                    this.setState({myjson:this.state.myjson})
                }

            componentWillMount(){
                this.getData()
                this.getJsonData()
                }

render(){
    let page2Style={
        marginLeft:'10px'
    }
    let tempName = ''    
    return(
        <div>
            <div>{this.state.mytext}
            <Link to="/">
                <div>返回</div>
            </Link></div>
            
            <ul>
                {this.state.myjson.map( (item,idx) => {
                    if(item.editHandle){
                        tempName = <input type="text" value={item.name} onChange={ (ev) => {this.itemInputHandle(ev,idx)}}/>
                    }else{
                        tempName = <span>名称:{item.name}</span>                            
                    }
                    return  (
                        <li key={idx}>
                            <p>
                            {tempName}
                            <button style={page2Style} onClick={ () => this.editHandle(idx)}>{item.editHandle?'保存':'修改'}</button>
                            <button style={page2Style} onClick={ () => this.delHandle(idx)}>删除</button>
                            </p>
                            <p>价格:{item.price} 元</p>
                            <p>日期:{item.date}</p>                          
                        </li>
                    )
                })}
            </ul>
            <label>
                名称:
                <input type="text" value={this.state.textInput} onChange={ (ev) => {this.inputNameHandle(ev)}}/>
            </label>
            <label>
                价格:
                <input type="text" value={this.state.textMoney} onChange={ (ev) => {this.inputMoneyHandle(ev)}}/>
            </label>
            
            <button style={page2Style} onClick={ () => this.addHandle()}>添加</button>
        </div>
        )
    }
}

export default Page2
