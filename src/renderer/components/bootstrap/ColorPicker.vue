<style>

.colorpick {
    max-width: 240px;
}

.colorpick .form-control,
.colorpick .input-group-addon {
    border-radius: 0px;
}

</style>

<template>

<div class="input-group colorpick">
    <input type="text" v-model="color" class="form-control" />
    <span class="input-group-addon"><i></i></span>
</div>

</template>

<script>

export default {
    computed:{
        color:function(){
            return this.color | this.paperColor
        }
    },
    props: {

        color: {
            type: Object,
            default: new paper.Color('#000000')
        }

    },

    mounted() {
      this.$nextTick(function(){
        $('.colorpick').colorpicker().on('hidePicker.colorpicker', function(event) {
          $('input', '.colorpick').trigger('change');
        });
       });
    },

    filters: {

        paperColor: {

            read(color) {
                    if (color == null) return '#000000';
                    $('.colorpick').colorpicker('setValue', color.toCSS(false))
                    return color.toCSS(false)
                },

                write(color, old) {
                    return new paper.Color(color)
                }

        }

    }

}

</script>
