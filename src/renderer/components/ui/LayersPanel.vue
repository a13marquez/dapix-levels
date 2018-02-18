<template>
  <div>
        <h5 style="background-color:#282C34;padding:8px;">
        <a href="javascript:;" @click="open=!open" v-show="open"><i class="fa fa-minus-square-o"></i></a>
        <a href="javascript:;" @click="open=!open" v-show="!open"><i class="fa fa-plus-square-o"></i></a>
        Layers
        <span class="pull-right">
            <a href="javascript:;" @click="add" title="Add Layer"><i class="fa fa-plus"></i></a>
        </span>
    </h5>

    <div v-show="open">

        <div style="border: 1px solid #282C34; border-bottom: 0px solid #282C34; padding: 4px 8px; cursor: pointer; outline: none;" @click="rootSelected">
            Root
        </div>
        <div class="" style="overflow:auto;max-height:200px;">
            <layer-item v-for="(layer, index) in level.layers" 
                v-bind:layer="layer" 
                v-bind:total="total" 
                v-bind:index="index" 
                v-bind:key="layer.name"
                v-bind:selected="level.index == index" 
                @click="goto(index)"></layer-item>
        </div>

    </div>    
  </div>
</template>

<script>
import buttonDefault from './../bootstrap/ButtonDefault.vue'
import layerItem from './LayerItem.vue'

const {remote} = require('electron');
const {dialog} = remote;

export default {

    data() {
        return {
            open: true
        }
    },

    props: {

        level: null,
        tileset: null,
       

    },

    mounted() {
      this.$nextTick(function(){
        
        $('.' + this.id).width(this.width);
      });
    },

    methods: {

        add() {
            var container = new createjs.Container();
            //this.drawParent.addChild(container);
            this.level.layers.push({
                name: 'Layer ' + this.level.layers.length,
                data: [],
                draw: container
            });
            this.level.index = this.level.layers.length - 1;
        },

        goto(index) {
            this.level.index = index;
        },

        swapLayers(layer1, layer2) {
            var tmpName = layer1.name; var tmpData = layer1.data; var tmpDraw = layer1.draw;
            layer1.name = layer2.name; layer1.data = layer2.data; layer1.draw = layer2.draw;
            layer2.name = tmpName; layer2.data = tmpData; layer2.draw = tmpDraw;
            // this.drawParent.swapChildren(layer1.draw, layer2.draw);
            // this.drawParent.stage.update();
        },

        removeLayer(index) {
            var layer = this.level.layers[index];
            // this.drawParent.removeChild(layer.draw);
            // this.drawParent.stage.update();
            this.level.layers.splice(index, 1);
            if (this.level.layers.length == 0) this.add();
        },

        rootSelected() {
            this.$emit('rootselected');
        }

    },

    events: {

        'moveup': function (index) {
            console.log(index - 1);
            if (index - 1 >= 0) {
                this.swapLayers(this.level.layers[index], this.level.layers[index-1]);
            }
        },

        'movedown': function (index) {
            if (index + 1 <= this.level.layers.length - 1) {
                this.swapLayers(this.level.layers[index], this.level.layers[index+1]);
            }
        },

        'removeLayer': function (index) {
            var layer = this.level.layers[index];
            if (layer.draw.children.length > 0) {
                var response = dialog.showMessageBox({
                    type: 'warning',
                    buttons: ['Cancel', 'OK'],
                    defaultId: 0,
                    title: 'Remove Layer...',
                    message: 'The layer is not empty, are you sure you want to remove?',
                    cancelId: 0
                });

                if (response == 1) this.removeLayer(index);
            }

        }

    },

    computed: {

        total: function () {
            return this.level.layers.length;
        },

        drawParent: function () {
          this.drawParent = this.level.layers[this.level.index].draw.parent;
        }

    },

    components: { buttonDefault, layerItem }

}
</script>
