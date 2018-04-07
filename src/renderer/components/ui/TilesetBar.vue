<style>
.tileset-bar {
    overflow: hidden;
}
</style>

<template>
<div class="btn-toolbar tileset-bar">

    <table cellspace="8">
        <tr>
            <td>
                <div class="btn-group">
                    <button @click="open" title="Add Tile"> <i class="fa fa-plus"></i> </button>
                    <button @click="reimage" title="Change image"> <i class="fa fa-picture-o"></i> </button>
                    <button @click="remove" title="Remove Tile"> <i class="fa fa-trash-o"></i> </button>
                </div>

                <div style="width:8px;display:inline-block;float:left;">&nbsp;</div>
                <input type="text" name="name" v-model="filter" placeholder="Search..." style="display:inline-block;width:35%;" class="form-control">

                <span class="pull-right">
                    Indexes: {{ tileset.indexes }}
                    <button @click="openTileset" title="Open Tileset"> <i class="fa fa-folder-open"></i> </button>
                    <button @click="saveTileset" title="Save Tileset"> <i class="fa fa-save"></i> </button>
                </span>
            </td>
        </tr>
        <tr>
            <td style="width:100%;vertical-align:top;padding: 6px;">
                <div id="tiles">
                    <tileset-item v-for="tile in filteredTiles" 
                    v-bind:tile="tile" 
                    v-bind:index="index" 
                    v-bind:key="tile.id"
                    v-bind:selected="tileset.indexes.indexOf(index) != -1" 
                    @click.stop="goto($event, index)"></tileset-item>
                </div>
            </td>
        </tr>
    </table>

</div>
</template>

<script>
import buttonDefault from './../bootstrap/ButtonDefault.vue'
import tilesetItem from './TilesetItem.vue'

const {remote} = require('electron');
var fs = require('fs');
const {dialog} = remote;

export default {
    computed: {
      filteredTiles () {
        let self = this;
        return self.tileset.tiles.filter((tile) => {
          return tile.id.indexOf(self.filter) !== -1;
        });  
      }
    },
    data() {
        return {
            filter: '',
            tileSet: this.tileset
        }
    },

    props: {

        tileset: null

    },

    mounted() {
      this.$nextTick(function(){
        $(document).keydown(this.onKey);            
      })
    },

    methods: {

        onKey(e) {
            /*switch (e.keyCode) {
                case KEY_SPACE:
                    this.playing = !this.playing;
                    break;
                case KEY_START:
                    this.first();
                    break;
                case KEY_END:
                    this.last();
                    break;
                case KEY_AVPAG:
                    this.next();
                    break;
                case KEY_REPAG:
                    this.previous();
                    break;
                case KEY_SUPR:
                    this.remove();
                    break;
                case KEY_N:
                    this.add();
                    break;
                case KEY_D:
                    if (e.ctrlKey) this.copy();
                    break;
                case KEY_C:
                    if (e.ctrlKey) this.onion = !this.onion;
                    break;
            }
            e.preventDefault();*/
        },

        // Data

        importData(raw) {
            tileSet = JSON.parse(raw);
        },

        exportData() {
            var data = JSON.stringify(tileSet);
            return data;
        },

        // Tileset

        newTileset() {
            debugger
            this.tileSet = {
                tiles: [],
                indexes: [],
                savepath: ''
            };
        },

        openTileset() {
            var files = dialog.showOpenDialog({
                title: 'Open tileset...',
                buttonLabel: 'Open',
                filters: [
                    {name: 'Tileset (.tileset)', extensions: ['tileset']},
                    {name: 'All Files (.*)', extensions: ['*']}
                ],
                properties: ['openFile']
            });
            var fs = require('fs');
            var data = fs.readFileSync(files[0]);
            this.importData(data)
            tileSet.savepath = files[0];
        },

        saveTileset() {
            if (tileSet.savepath == '') {
                this.saveTilesetAs();
            } else {
                fs.writeFile(tileSet.savepath, this.exportData(), function (err) {
                    if (err) throw err;
                });
            }
        },

        saveTilesetAs() {
            var self = this;
            dialog.showSaveDialog({
                filters: [
                    {name: 'Tileset (.tileset)', extensions: ['tileset']},
                    {name: 'All Files (.*)', extensions: ['*']}
                ]
            }, function (fileName) {
                if (fileName === undefined) return;
                self.tileset.savepath = fileName;
                fs.writeFile(fileName, self.exportData(), function (err) {
                    if (err) throw err;
                });
            });
        },

        // Tile

        open() {
            var files = dialog.showOpenDialog({
                title: 'Import...',
                buttonLabel: 'Import',
                filters: [
                    {name: 'PNG', extensions: ['png']},
                    {name: 'All Files', extensions: ['*']}
                ],
                properties: ['openFile']
            });

            if (files != undefined) {
                var image = fs.readFileSync(files[0]);
                var base64image = new Buffer(image).toString('base64');
                this.add('data:image/png;base64,' + base64image);
            }
        },

        reimage() {
            if (tileSet.indexes.length == 1) {
                var files = dialog.showOpenDialog({
                    title: 'Change image...',
                    buttonLabel: 'Change',
                    filters: [
                        {name: 'PNG', extensions: ['png']},
                        {name: 'All Files', extensions: ['*']}
                    ],
                    properties: ['openFile']
                });

                if (files != undefined) {
                    var image = fs.readFileSync(files[0]);
                    var base64image = new Buffer(image).toString('base64');
                    var tile = tileSet.tiles[tileSet.indexes[0]];
                    tile.image = 'data:image/png;base64,' + base64image;
                    this.$emit('remapTileImage', tile);
                }
            } else {
                if (tileSet.indexes.length == 0) {
                    dialog.showMessageBox({
                        title: 'Warning...',
                        type: 'warning',
                        message: 'You must to select one tile from the models for change its image.',
                        buttons: ['OK']
                    });
                } else {
                    dialog.showMessageBox({
                        title: 'Warning...',
                        type: 'warning',
                        message: 'You must to select only one tile from the models for change its image.',
                        buttons: ['OK']
                    });
                }
            }
        },

        add(base64image) {
            tileSet.tiles.push({
                image: base64image,
                ID: "Tile " + tileSet.tileIndex++,
                properties: {}
            });

            // Get the new index for the new tile
            var index = tileSet.tiles.length - 1;

            // Change selection index
            tileSet.indexes = [index];
            this.$emit('changetile', tileSet.indexes);
        },

        remove() {
            tileSet.indexes.sort().reverse();
            for (var i in tileSet.indexes) tileSet.tiles.splice(tileSet.indexes[i], 1);

            // Reset selection to first item
            tileSet.indexes = [0];
        },

        goto(event, index) {
            if (event.shiftKey) {
                if (tileSet.indexes.indexOf(index) != -1) {
                    tileSet.indexes.slice(tileSet.indexes.indexOf(index), 1);
                } else {
                    tileSet.indexes.push(index);
                }
            } else {
                tileSet.indexes = [index];
            }
            this.$emit('changetile', tileSet.indexes);
        }

    },

    events: {

        'opentileset': function(data) {
            tileSet = JSON.parse(data);
        }

    },

    components: {
        buttonDefault, tilesetItem
    }

}

const KEY_SPACE = 32
const KEY_START = 36
const KEY_END = 35
const KEY_AVPAG = 34
const KEY_REPAG = 33
const KEY_N = 78
const KEY_D = 68
const KEY_C = 67
const KEY_SUPR = 46

</script>
