import React from 'react';
import { Link } from 'react-router-dom'
import { Upload, Icon, message } from 'antd'
import  "./page1.css"

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
class Page1 extends React.Component{
    state = {
        loading: false,
        pictureList: [],
        pictureUrlList:[]
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            })
          );
        }
      }
      getImgData(){ //请求图片数据
        fetch(`http://127.0.0.1:8081/home/getImg`,{
        method: 'GET',
        // responseType: 'blob'
        })
        .then(res => res.json()).then(data => {
           if(data.code === 200){
               let {imgsUrl} = data.data
               this.setState({pictureList:imgsUrl})
               this.state.pictureList.forEach ( t => {
                   this.getImgUrl(t.imsrc)
               })
           }
        }).catch(e => console.log('错误:', e))
      }

      getImgUrl(pictureUrl){ //请求图片路径
        fetch(`http://127.0.0.1:8081/home/getImgUrl/${pictureUrl || ''}`,{
        method: 'GET',
        responseType: 'blob'
        }).then(res => {
            if(res.status === 200){
                this.state.pictureUrlList.push(res.url)
                this.setState({pictureUrlList:this.state.pictureUrlList})
            }
        }).catch(e => console.log('错误:', e))
      }
      

      componentWillMount(){
        this.getImgData()
      }
      
render(){
    let page1Style={}
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
return(
<div>
    <div className="page1Style" style={page1Style}>This is Page1!</div>
<div>
            <Link to="/">
                <div>返回</div>
            </Link>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://127.0.0.1:8081/home/uploads"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {this.state.pictureUrlList.map ( (item, idx) => {
          return  (
            <img src={item} key={idx} alt="img" style={{ width: '50%',height:'50%', borderWidth: '1px', borderStyle: 'dashed',borderColor:'#ccc', padding: '5px'}} />
         )
      })}
</div>
</div>
)
}
}

export default Page1
