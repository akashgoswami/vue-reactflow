<template>
  <div id="app">
    
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <h1 class="text-xl font-bold text-gray-900">
          Vue.js ReactFlow Demo
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <p>This is a demo of running a React component in Vue.js. Drag nodes to the workspace below. To delete a node/edge press Delete. 
        The element lists gets updated in real-time</p>

        <div class="px-4 py-6 sm:px-0">
          <button class="m-2 testNode selectable" @dragstart="(event)=> onDragStart(event, 'testNode')" draggable>Test Node</button>
          <button class="m-2 conditionNode selectable" @dragstart="(event)=> onDragStart(event, 'conditionNode')" draggable>Condition Node</button>
         
          <div class="flex">
             
          <div class="w-4/5">
              
            <react-flow style="height:400px; width:100%;" class="border-2 border-dashed border-gray-200 rounded-lg h-96" :bus="bus" :state="graph" 
                      @nodeDblClick="handleNodeDblClick" @edgeDblClick="handleNodeDblClick" @stateChange="onStateChange" ref="mygraph" />  
          </div>
           <div class="w-1/5">
             <div class="border-2 border-dashed border-gray-200 rounded-lg whitespace-pre text-tiny font-mono  bg-gray-100 ">
               {{graph}}
               
             </div>
              
          
          </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
    
    


    <p>
    
    </p>
  </div>
</template>

<script>
import { ReactInVue  } from 'vuera'
import Graph from './components/graph.jsx'
import EventBus from './eventbus.js'

  
export default {
  name: 'App',
  components: { 
   'react-flow': ReactInVue(Graph), 
  },
  methods:{
    handleNodeDblClick(event){
      window.alert(JSON.stringify(event, null, 4));
    },
    onStateChange(elements){
      this.graph = {
        elements : elements
        };
      //this.logs += "\n"+JSON.stringify(elements);
    },
    toggleAnimation(){
      this.toggle = !this.toggle; 
      EventBus.$emit('updateElement', { id: 'e1-2', source: '1', target: '2', animated: this.toggle })
    },
    onDragStart(event, nodeType){
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
      console.log("Drag", event)
    },
    addNode(){
      this.graph.elements.push( {
        id: Math.ceil(Math.random()*1000)+'',
        type: 'output', // output node
        data: { label: 'Random Node' },
        position: { x: 150+ Math.ceil(Math.random()*100), y: 150 },
      });
      EventBus.$emit('setElements', { elements: this.graph.elements} );
     }
  },
  mounted(){
      this.bus.$on('dblClick', this.handleDblClick);
  },
  data: () =>{
  return {
    bus: EventBus,
    logs: "empty",
    toggle : false,
    graph : { 
      elements: [{
        id: 'start',
        type: 'input', // input node
        style: { background: '#70de70', borderRadius: 50, padding: 10 },
        sourcePosition: 'right',
        data: { label: 'start' },
        position: { x: 50, y: 250 },
    },

    {
        id: 'finish',
        type: 'output', // output node
        data: { label: 'End' },
        style: { background: '#ffa4a4', borderRadius: 50, padding: 10 },
         
        targetPosition: 'left',
    
        position: { x: 550, y: 250 },
    },
    // animated edge
    ]
    }
    }
  }  
}
</script>

<style>
.btn, p {
  font-size: 10px;
}

.conditionNode {
  border: 1px solid #777;
  font-size: 10px;
  background: #eee;
  border-radius: 50px;
  padding: 10px; 
}

.testNode{
  border: 1px solid #777;
  
  font-size: 10px;
  background: #3b82f6;
  border-radius: 5px;
  color:white;
  padding: 10px 20px;
}

.dragNode{
  margin-bottom: 10px;
  font-size: 10px;
  flex-direction: column;
  display: flex;
  height: 100%;
}

.conditionNode .react-flow__handle-connecting {
  background: red;
  -webkit-box-shadow: 1px 1px 4px 0px #ef4444;
  -moz-box-shadow: 1px 1px 4px 0px #ef4444;
  box-shadow: 1px 1px 4px 0px #ef4444;
}

.testNode .react-flow__handle-connecting {
  background: blue;
  -webkit-box-shadow: 1px 1px 4px 0px aqua;
  -moz-box-shadow: 1px 1px 4px 0px aqua;
  box-shadow: 1px 1px 4px 0px aqua;  
}


</style>
