import React, {} from 'react';
import ReactFlow, { removeElements, addEdge, Controls, Background, updateEdge } from 'react-flow-renderer';

import ConditionNode from './condition.jsx';
import TestNode from './test.jsx';

var findCommon = (a, b, p) => a.filter(aa => b.find(bb => aa[p] === bb[p]));
var merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: props.state.elements
        };
        props.bus.$on('updateElement', this.updateElement.bind(this));
        props.bus.$on('setElements', this.setElements.bind(this));
        this.reactFlowWrapper = React.createRef();
        this.reactFlowInstance = null;

    }

    nodeTypes = {
        conditionNode: ConditionNode,
        testNode: TestNode
    };

    //This function would merge the passed elements array with the current one
    // and remove all unnecessary elements. 
    // Use this to override the entire graph
    setElements = (params) => {


        var targetItems = findCommon(this.state.elements, params.elements, 'id');
        let newElements = merge(targetItems, params.elements, "id");
        this.setState({
            elements: newElements
        });
    }

    onLoad = (_reactFlowInstance) => {
        this.reactFlowInstance = _reactFlowInstance;
    }

    onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });
    onConnectStop = (event) => console.log('on connect stop', event);
    onConnectEnd = (event) => console.log('on connect end', event);


    onEdgeUpdate = (oldEdge, newConnection) => {

        let newElements = updateEdge(oldEdge, newConnection, this.state.elements);
        this.setState({
            elements: newElements
        });
        // Trigger the parent about the change to the property
        this.props.stateChange(newElements);
    };


    onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = this.reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = this.reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: type + Math.ceil(1000 * Math.random()),
            type,
            position,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `Test node` },
        };

        let newElements = merge(this.state.elements, [newNode], "id");
        console.log(newElements);
        this.setState({
            elements: newElements
        });
        this.props.stateChange(newElements);

        //setElements((es) => es.concat(newNode));
    };

    //This function will update a given individual element 
    onNodeDoubleClick = (event, element) => {
        this.props.nodeDblClick(element);
    }

    onEdgeDoubleClick = (event, element) => {
        this.props.edgeDblClick(element);
    }



    //This function will update a given individual element 
    updateElement = (elem) => {
        let newElements = this.state.elements.map((el) => {
            if (el.id == elem.id) {
                return elem;
            }
            else {
                return el;
            }
        });

        this.setState({
            elements: newElements
        });

    }


    onElementsRemove = (elementsToRemove) => {
        let isStartOrEnd = elementsToRemove.some(el => (el.type == "input" || el.type == "output"));
        if (isStartOrEnd) {
            window.alert("Could not delete Start or End node");
            return;
        }
        let newElements = removeElements(elementsToRemove, this.state.elements);
        this.setState({
            elements: newElements
        });
        // Trigger the parent about the change to the property
        this.props.stateChange(newElements);
    }

    onConnect = (params) => {
        //console.log(params);

        //A condition Node is only allowed to be connected with a Single Test Node
        if (params.target.startsWith("condition")) {
            let alreadyConnected = this.state.elements.some((el) => el.target == params.target);
            if (alreadyConnected) {
                window.alert("A Condition Node can only be connected with a single Source");
                return;
            }
            if (params.source.startsWith("condition")) {
                window.alert("Conditions Could not be chained at the moment");
                return;
            }
        }

        if (params.target.startsWith("test")) {
            if (params.source.startsWith("test")) {
                window.alert("Test Could not be chained without a condition in between");
                return;
            }
            let alreadyConnected = this.state.elements.some((el) => el.target == params.target);
            if (alreadyConnected) {
                window.alert("A Test Node can only be connected with a single Condition");
                return;
            }
        }


        let newElements = addEdge(params, this.state.elements);
        this.setState({
            elements: newElements
        });
        // Trigger the parent about the change to the property
        this.props.stateChange(newElements);
    }


    render() {
        return (

            <ReactFlow ref={this.reactFlowWrapper} snapToGrid 
                  onConnectStart={this.onConnectStart}
                    onConnectStop={this.onConnectStop}
                    onConnectEnd={this.onConnectEnd}
                    onNodeDoubleClick={this.onNodeDoubleClick}
                    onEdgeDoubleClick={this.onEdgeDoubleClick}
            onEdgeUpdate={this.onEdgeUpdate} nodeTypes={this.nodeTypes} onLoad={this.onLoad} elements = { this.state.elements } onDragOver={this.onDragOver} onDrop={this.onDrop} onElementsRemove = { this.onElementsRemove } onConnect = { this.onConnect } deleteKeyCode = { 46 } >
             <Controls />
              <Background
      variant="dots"
      gap={12}
      size={0.5}
    />
   
            </ReactFlow>

        );
    }
}


export default Graph;
