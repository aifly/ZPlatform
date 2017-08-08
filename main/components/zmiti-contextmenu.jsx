import React, {
	Component
} from 'react';

import './css/contextmenu.css';

export default class ZmitiContextmenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

			showMenu: false
		}
	}
	render() {
		return (
		<div className='contextmenu-main-ui'  style={{left:this.props.left,top:this.props.top}}>
				{this.state.showMenu&&<ul>
			{
				this.props.menus.map((item, i) => {
					return <li key={i} onMouseOver={()=>{item.mouseover()}} onMouseOut={()=>{item.mouseout()}}  onClick={()=>{window.obserable.trigger({type:'toggleContextmenu',data:false});item.fn(i)}}>
										  		{item.type} {item.name}
										  	</li>
				})
			} < /ul>}
			</div>
		);
	}
	componentDidMount() {
		window.obserable.on('toggleContextmenu', (data) => {
			this.setState({
				showMenu: data
			})
		});

		this.setState({
			style: {
				left: this.props.left,
				top: this.props.top
			}
		})
	}
}