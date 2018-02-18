<style>
.btn {
    border-radius: 0;
    margin-bottom: 0;
}

</style>

<template>

<label v-bind:class="'btn btn-' +  stl ">
    <input type="radio" v-bind:name="name" v-bind:id="id"  autocomplete="off" v-model="toggle">
    <slot>
        Button
    </slot>
</label>

</template>

<script>

export default {
    computed: {
        isToggled (){
            return this.toggle ? 'active' : ''
        }
    },
    props: {

        'stl': {
            type: String,
            default: 'secondary'
        },
        'toggle': {
            type: Boolean,
            default: false
        },
        'name': {
            type: String,
            default: 'button-radio'
        },
        'id': {
            type: String,
            default: 'button-radio-1'
        }

    },

    watch: {

        'toggle': function(val, old) {

            this.$emit('toggle', val);

        }

    }

}

</script>
