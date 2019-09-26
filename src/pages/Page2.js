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
            fetch(`http://127.0.0.1:8081/shop`,{
            method: 'GET'
            }).then(res => res.text()).then(
            data => {
            this.setState({mytext:data})
            }
            ).catch(e => console.log('错误:', e))
        }

        getJsonData(){ //请求数据函数
                fetch(`http://127.0.0.1:8081/shop/get`,{
                method: 'GET'
                }).then(res => res.json()).then(
                data => {
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
                    fetch(`http://127.0.0.1:8081/shop/add`,{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(obj)
                        }).then(res => res.json()).then(data => {
                           console.info(data)
                           if(data.code === 200){
                               console.info(data.msg)
                               this.getJsonData()
                           }
                        }
                    ).catch(e => console.log('错误:', e))
                
                    this.clearInput()
                }

                clearInput(){
                    this.setState({textInput:'',textMoney:''})
                }

                editHandle(idx){
                    // this.state.myjson[idx].editHandle = !this.state.myjson[idx].editHandle
                    // react 不允许直接修改state属性 要通过setState 所以要先赋值一个新的变量                    
                    let updateMyjson = [...this.state.myjson]
                    // 为true的时候保存操作                     
                    if(updateMyjson[idx].editHandle){
                        let params = {
                            _id:this.state.myjson[idx]._id,
                            name:this.state.myjson[idx].name,
                            price:this.state.myjson[idx].price
                        }
                        fetch(`http://127.0.0.1:8081/shop/edit`,{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(params)
                        }).then(res => res.json()).then(data => {
                           console.info(data)
                           if(data.code === 200){
                               console.info(data.msg)
                               this.getJsonData()
                           }
                        }
                    ).catch(e => console.log('错误:', e))
                    }else{
                        updateMyjson.forEach( t => {
                            t.editHandle = false
                        })
                        updateMyjson[idx].editHandle = !updateMyjson[idx].editHandle
                        this.setState({myjson:updateMyjson})
                    }
                
                }
                
                cancel(idx){
                    let cancelMyjson = [...this.state.myjson]
                    cancelMyjson[idx].editHandle = !cancelMyjson[idx].editHandle
                    this.setState({myjson:cancelMyjson})
                }

                itemNameInputHandle(ev,idx){
                    let updateMyjson = [...this.state.myjson]
                    updateMyjson[idx].name = ev.target.value
                    this.setState({myjson:updateMyjson})    
                }
                itemPriceInputHandle(ev,idx){
                    let updateMyjson = [...this.state.myjson]
                    updateMyjson[idx].price = ev.target.value
                    this.setState({myjson:updateMyjson})   
                }

                delHandle(idx){
                    fetch(`http://127.0.0.1:8081/shop/delete`,{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({_id:this.state.myjson[idx]._id})
                        }).then(res => res.json()).then(data => {
                           console.info(data)
                           if(data.code === 200){
                               console.info(data.msg)
                               this.getJsonData()
                           }
                        }
                    ).catch(e => console.log('错误:', e))
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
    let tempPrice = ''
    let handleButton = ''
    return(
        <div>
            <div>{this.state.mytext}
            <Link to="/">
                <div>返回</div>
            </Link></div>
            
            <ul>
                {this.state.myjson.map( (item,idx) => {
                    if(item.editHandle){
                        tempName = <input type="text" value={item.name} onChange={ (ev) => {this.itemNameInputHandle(ev,idx)}}/>
                        tempPrice = <input type="text" value={item.price} onChange={ (ev) => {this.itemPriceInputHandle(ev,idx)}}/>                        
                    }else{
                        tempName = <span>名称:{item.name}</span>   
                        tempPrice = <span>价格:{item.price}</span>               
                    }
                    if(!item.editHandle){
                        handleButton = <button style={page2Style} onClick={ () => this.delHandle(idx)}>删除</button>
                    }else{
                        handleButton = <button style={page2Style} onClick={ () => this.cancel(idx)}>取消</button>
                    }
                    return  (
                        <li key={idx}>
                            <p>
                            {tempName}
                            <button style={page2Style} onClick={ () => this.editHandle(idx)}>{item.editHandle?'保存':'修改'}</button>
                            {handleButton}
                            </p>
                            <p>
                                {tempPrice}
                            </p>
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
