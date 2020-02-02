import * as React from 'react';
import Rect from "./Rect";
import Circ from "./Circ";
import ShiftClient from 'src/manipulation/ShiftClient';

enum ShapeType{
	SP_RECT = 62,
	SP_CIRC,
	SP_LINE,
	SP_POLYL,
	SP_POLYG,
}

export type Tag = {
	id: number;
	tag: ShapeType;
	attrs: object;
	style: {
		values: object,
		loc: object
	}
}

export type ShapeProps = {manipulate: Function, defs: Tag, children: any}
export type ShapeState = {hovering: boolean, style: object}

export type Props = {manipulate: Function, defs: Tag, key: number}

export class Shape extends React.Component<Props, any>{
	readonly props: Props;
	
	constructor(props){
		super(props);
	}

	render(){
		switch(this.props.defs.tag){
			case ShapeType.SP_RECT:
				return (<Rect
							manipulate={this.props.manipulate}
							defs={this.props.defs}>
						</Rect>);
			case ShapeType.SP_CIRC:
				return (<Circ 
							manipulate={this.props.manipulate}
							defs={this.props.defs}>
						</Circ>);
			default:
				return null;
		}
	}
}
