import * as React from 'react';
import './css/Canvas.css';
import {Shape, Tag} from './shapes/Shape';
import {EventClient, Events} from '../EventClient';

type Props = {client: EventClient}
type State = {frame: any, width:number, height:number, originX: number, originY: number}
class Canvas extends React.PureComponent<Props, State> {
	timer: any;
	state: State;
	client: EventClient;

	constructor(props: Props){
		super(props);
		this.state = {
			frame: [],
			width: 500,
			height: 500,
			originX: 0,
			originY: 0
		}
	}

	play(){
		this.timer = setInterval(()=>{
			this.props.client.requestFrame();
		}, 500);
	}

	pause(){
		clearInterval(this.timer);
	}

	componentDidMount(){
		this.props.client.on(Events.REQ_COMPILE, () => {
			this.pause();
		});

		this.props.client.on(Events.FIN_COMPILE, (data) => {
			if(data > 1){
				this.play();
			}else{
				this.props.client.requestFrame();
			}
		});

		this.props.client.on(Events.FRAME, (data) => {
			const tags = data ? data.map((item) => {
				return <Shape key={item.id} defs={item}/>
			}): null;
			this.setState({frame: tags});
		});
	}

	getViewBox(){
		return [
			this.state.originX,
			this.state.originY, 
			this.state.width, 
			this.state.height
		].join(" ");
	}

	render () {
		return (
				<svg className='canvas shadow' viewBox={this.getViewBox()}
				>
					{this.state.frame}
				</svg>
		);
	}
}
 
export default Canvas;