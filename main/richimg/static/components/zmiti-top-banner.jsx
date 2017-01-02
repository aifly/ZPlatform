import React from 'react';
import '../../../components/theme.css';
import { Tag,Modal,Input,Button} from '../../../commoncomponent/common.jsx';

export default class ZmitiTopBanner extends React.Component {
    constructor(args) {
        super(...args);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
        this.addTagItem=this.addTagItem.bind(this);
        this.onKeyDown=this.onKeyDown.bind(this);
        this.state = {
            visible:false
        }
    }

    onKeyDown(e){
        e.keyCode === 13 && this.handleCancel();
    }

    handleCancel(){
        this.setState({
            visible:false
        })
    }
    addTagItem(e){
        this.props.changeTagList(e.target.value);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    handleOk(){
        this.setState({
            visible:false
        })
    }

    render() {


        return (
            <div className="rm-top-banner-group">
                <div className="form-group has-success">
                    <Input type="text" placeholder="输入标题名称" value={this.props.projectName}
                           onChange={this.changeProjectName.bind(this)}/>
                    <Button onClick={this.showModal}>添加标签</Button>
                </div>
                <div className="right-btn-group">
                    {this.props.tagList&& this.props.tagList.split(',').map((tag,i)=>{
                        return <Tag  color="red" key={i}>{tag}</Tag>;
                    })}
                </div>

                <Modal ref="modal"
                       visible={this.state.visible}
                       title="添加标签" onOk={this.handleOk} onCancel={this.handleCancel}
                       footer={[
            <Button key="back" type="primary" size="large" onClick={this.handleCancel}>确 定</Button>
          ]}
                >
                    <p>多个标签以英文输入法状态下的','号分隔</p>
                    <p>例如：标签1,标签2,标签3</p>
                    <p>&nbsp;</p>
                    <Input onKeyDown={this.onKeyDown} onChange={this.addTagItem} value={this.props.tagList} type="text" placeholder="输入标签，多个标签以','分隔"/>
                </Modal>
            </div>
        )
    }

    changeProjectName(e) {
        this.props.changeProjectName(e.target.value);
    }
}