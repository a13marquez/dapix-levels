<style>
.propertyItem {
    border: 1px solid #333;
    border-bottom: 0px;
    /*display: inline-block;*/
    width: 100%;
    /*padding: 6px 8px 4px;*/
}
.propertyItem:last-child {
    border-bottom: 1px solid #333;
}
.propertyItem .form-control {
    border-radius: 0px;
}
.propertyItem .property-not-editable {
    padding: 6px 8px 4px;
}
</style>

<template>
<div class="propertyItem">
    <div v-show="lock" class="property-not-editable">
        <b>{{ cKey }}:</b>  {{ val }}
    </div>
    <div >
        <table>
            <tr>
                <td>
                    <input type="text" class="form-control" name="name" placeholder="Name..."
                        onclick="this.select();"
                        @change="update"
                        @blur="blur"
                        @cKeyup.13="update"
                        v-show="cKey!='ID' && type!='Instance'"
                        v-model="cKey"
                    />
                    <div  class="property-not-editable">{{ cKey }}:</div>
                </td>
                <td>
                    <input type="text" class="form-control" name="value" placeholder="Value..."
                        onclick="this.select();"
                        @change="update"
                        @blur="blur"
                        @cKeyup.13="update"
                        v-show="(cKey=='ID' && type!='Instance') || (cKey!='ID')"
                        v-model="val"
                    />
                    <div  class="property-not-editable">{{ val }}</div>
                </td>
                <td>
                    <a href="javascript:;" @click="remove" v-show="cKey!='ID' && type!='Instance'" class="pull-right">
                        <i class="fa fa-trash-o"></i>
                    </a>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
export default {

    data() {
        return {
            oldKey: null,
            oldValue: null
        }
    },

    props: {

        cKey: null,
        val: null,
        lock: null,
        type: null

    },

    mounted() {
      this.$nextTick(function(){
        this.oldKey = this.cKey;
        this.oldVal = this.val;    
      })
    },

    methods: {

        blur() {
            //console.error($(document.activeElement));
            this.update();

        },

        update() {
            if (this.oldKey != null) this.$emit('changeProperty', this.oldKey, this.oldVal, this.cKey, this.val);
            this.oldKey = this.cKey;
            this.oldVal = this.val;
            //this.editing = false;
        },

        remove() {
            this.$emit('removeProperty', this.cKey);
        }

    }

}
</script>
