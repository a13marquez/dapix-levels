<style>

.form-control,
.input-group-addon {
    border-radius: 0px;
}

</style>

<template>

<div v-bind:class="'input group ' + id">
    <span class="input-group-addon" v-if="addonLeft">
            <slot name="left">
            </slot>
        </span>
    <input class="form-control" v-bind:type="type" v-model.number="value" v-bind:min="min" v-bind:max="max" 
    v-bind:title="title" />
    <span class="input-group-addon" v-if="addonRight">
            <slot name="right">
            </slot>
        </span>
</div>

</template>

<script>

export default {

    props: {

        type: {
            type: String,
            default: 'text'
        },
        width: {
            type: Number,
            default: 250
        },
        group: {
            type: Boolean,
            default: true
        },
        addonLeft: {
            type: Boolean,
            default: false
        },
        addonRight: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 50
        },
        value: null,
        id: {
            type: String,
            default: _.uniqueId('input_')
        }

    },

    mounted() {
       this.$nextTick(function(){
            $('.' + this.id).width(this.width);
       });
    }

}

</script>
