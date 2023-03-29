<template>
    <div class="field_wrapper">
        <label :for="uninque_id_for_label()" class="text-capitalize d-block">
            <span v-if="!input_not_text" class="mb-2 d-block">
                {{ label }}
            </span>
            <input
                :type="type"
                :accept="is_preview && accept"
                :id="uninque_id_for_label()"
                :name="name"
                :required="required"
                :class="`${extra_class} ${!input_not_text?'form-control':'form-check-input'}`"
                :multiple="multiple"
                :value="value"
                :checked="checked"
                @change="input_change_handler"
                ref="input_el"
            />
            <span v-if="input_not_text" class="ps-1">
                {{ label }}
            </span>
        </label>
        <div class="file_preview" ref="preview_el" v-if="is_preview">
            <!-- <img
                v-for="(url, index) in image_urls"
                :key="index"
                :src="url"
                :alt="index"
                ref="preview_el"
            /> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "text",
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: null,
            required: false,
        },
        mutator: {
            type: Function,
            default: null,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: "image/*",
        },
        value: {
            type: [String, Number],
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        preview: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        extra_class: {
            type: String,
            default: '',
        },
        data_attr: {
            type: Array,
            default: null,
        }
    },
    data: function () {
        return {
            image_urls: [],
        };
    },
    methods: {
        input_change_handler: function () {
            if (this.is_preview && this.type == 'file') {
                this.preview_image();
            }

            this.mutator &&
            this.mutator({
                value: event.target.value,
                name: event.target.name,
                event,
            });
        },
        preview_image: function () {
            let files = event.target.files;
            let that = this;
            that.$refs.preview_el.innerHTML = ``;
            for (let i = 0; i < files.length; i++) {
                var reader = new FileReader();
                reader.onload = function(event){
                    let img = new Image();
                    img.src = event.target.result;
                    let context_data_to_string = window.dataURItoBlob(img.src);
                    that.$refs.preview_el.innerHTML += `<img src="${URL.createObjectURL(context_data_to_string)}" />`
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        },
        uninque_id_for_label: function(){
            let id = this.name || (this.data_attr?.name && 'data-'.data_attr?.name);
            return this.input_not_text?this.label.replaceAll(' ','_'):id
        },

    },
    mounted: function(){
        this.data_attr?.map(i=>{
            this.$refs.input_el.dataset[Object.keys(i)[0]] = i[Object.keys(i)[0]];
        })
    },
    computed: {
        is_preview: function () {
            return this.type === "file" && this.preview === true;
        },
        input_not_text: function(){
            return ['checkbox','radio'].includes(this.type);
        }
    },
};
</script>

<style>
</style>
