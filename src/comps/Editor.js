import React, { Component } from 'react';
import '../css/Editor.css';

class Editor extends Component { 
    
    constructor(props){
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className='editor-wrapper'>
                <textarea className='max dark'>{text}</textarea>
            </div>
        );
    }
}
export default Editor;