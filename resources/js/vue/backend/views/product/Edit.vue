<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Edit</h4>
                <div class="btns">
                    <a href="" @click.prevent="call_store(`set_${store_prefix}`,null), $router.push({ name: `All${route_prefix}` })"  class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        <span >
                            Back
                        </span>
                    </a>
                </div>
            </div>
            <form @submit.prevent="call_store(`update_${store_prefix}`,$event.target)" autocomplete="false" class="update_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="admin_form form_1" v-if="this[`get_${store_prefix}`]">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Name`"
                                        :name="`product_name`"
                                        :value="this[`get_${store_prefix}`]['product_name']"
                                    />
                                </div>
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Price`"
                                        :name="`default_price`"
                                        :value="this[`get_${store_prefix}`]['default_price']"
                                    />
                                </div>

                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <div>
                                        <label class="mb-2 text-capitalize">
                                            Select Cateogry
                                        </label>
                                        <!-- <CategoryManagementModal/> -->
                                        <nested-category-modal></nested-category-modal>
                                    </div>
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`search keywords`"
                                        :name="`search_keywords`"
                                        :value="this[`get_${store_prefix}`]['search_keywords']"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`stock`"
                                        :name="`track_inventory_on_the_variant_level_stock`"
                                        :value="this[`get_${store_prefix}`]['track_inventory_on_the_variant_level_stock']"
                                        :type="`number`"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`low stock`"
                                        :name="`track_inventory_on_the_variant_level_low_stock`"
                                        :value="this[`get_${store_prefix}`]['track_inventory_on_the_variant_level_low_stock']"
                                        :type="`number`"
                                    />
                                </div>

                                <div class="full_width mb-2 row">

                                    <div class="col-lg-3" >
                                        <input-field
                                            :label="`Thumb Image`"
                                            :name="`image1`"
                                            :type="`file`"
                                            :accept="`image/*`"
                                            :multiple="false"
                                            :preview="true"
                                        />
                                    </div>
                                    <div class="col-lg-3" >
                                        <input-field
                                            :label="`Related Image 1`"
                                            :name="`image2`"
                                            :type="`file`"
                                            :accept="`image/*`"
                                            :multiple="false"
                                            :preview="true"
                                        />
                                    </div>
                                    <div class="col-lg-3" >
                                        <input-field
                                            :label="`Related Image 2`"
                                            :name="`image3`"
                                            :type="`file`"
                                            :accept="`image/*`"
                                            :multiple="false"
                                            :preview="true"
                                        />
                                    </div>
                                    <div class="col-lg-3" >
                                        <input-field
                                            :label="`Related Image 3`"
                                            :name="`image4`"
                                            :type="`file`"
                                            :accept="`image/*`"
                                            :multiple="false"
                                            :preview="true"
                                        />
                                    </div>
                                </div>

                                <div class="form-group d-grid align-content-start full_width gap-1 mb-2 " >
                                    <label for="specification">Specification</label>
                                    <div id="specification"></div>
                                    <!-- <textarea class="form-control" id="specification" name="specification" :value="this[`get_${store_prefix}`]['description']"></textarea> -->
                                </div>
                                <div class="form-group d-grid align-content-start full_width gap-1 mb-2 " >
                                    <label for="description">Description</label>
                                    <div id="description"></div>
                                    <!-- <textarea class="form-control" id="description" name="description" :value="this[`get_${store_prefix}`]['description']"></textarea> -->
                                </div>
                                <div class="seo_section full_width mt-5">

                                    <div class="heading mb-4">
                                        <h4 class="d-flex justify-content-center">Seo section</h4>
                                        <h6 class="d-flex justify-content-center">Boost traffic to your online business.</h6>
                                    </div>
                                    <hr>
                                    <div class="admin_form form_1 col_2 mt-3">
                                        <div class="form-group d-grid align-content-start gap-1 mb-2 ">
                                            <input-field
                                                :label="`Page Title`"
                                                :name="`page_title`"
                                                :value="this[`get_${store_prefix}`]['page_title']"
                                            />
                                        </div>

                                        <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                            <input-field
                                                :label="`product url`"
                                                :name="`product_url`"
                                                :value="this[`get_${store_prefix}`]['product_url']"
                                            />
                                        </div>

                                        <div class="form-group full_width d-grid align-content-start gap-1 mb-2 " >
                                            <label for="meta_description">Meta Description</label>
                                            <textarea class="form-control" :value="this[`get_${store_prefix}`]['meta_description']" id="meta_description" name="meta_description"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button type="submit" class="btn btn-outline-info" >
                        <i class="fa fa-upload"></i>
                        update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import InputField from '../components/InputField.vue'
import NestedCategoryModal from '../category/components/NestedCategoryModal.vue';
/** store and route prefix for export object use */
import PageSetup from './PageSetup';
const {route_prefix, store_prefix} = PageSetup;
export default {
    components: { InputField, NestedCategoryModal },
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix,
            route_prefix,
        }
    },
    created: async function () {
        this.set_clear_selected_categorys(false);
        await this[`fetch_${store_prefix}`]({id: this.$route.params.id});
    },
    watch: {
        [`get_${store_prefix}`]: {
            handler: function(){
                this.initEditor();
                this.check_selected_categories();
            },
            deep: true,
        }
    },
    methods: {
        ...mapActions([
            `update_${store_prefix}`,
            `fetch_${store_prefix}`,
        ]),
        ...mapMutations([
            `set_clear_selected_categorys`,
            `set_${store_prefix}`,
            `set_${store_prefix}_description`,
            `set_${store_prefix}_specification`,
        ]),
        call_store: function(name, params=null){
            this[name](params)
        },
        initEditor: function(){
            let that = this;

            setTimeout(async function() {
                let description = window.editor = await CKEDITOR.ClassicEditor
                    .create( document.querySelector( '#description' ), window.ck_editor_config)
                    .catch( error => {
                        console.error( error );
                    } );
                description.data.set(that[`get_${store_prefix}`]['description'])

                let specification = await CKEDITOR.ClassicEditor
                    .create( document.querySelector( '#specification' ), window.ck_editor_config )
                    .catch( error => {
                        console.error( error );
                    } );
                specification.data.set(that[`get_${store_prefix}`]['specification'])

                that[`set_${store_prefix}_description`](description.data.get());
                that[`set_${store_prefix}_specification`](specification.data.get());

                description.model.document.on('change', function(){
                    that[`set_${store_prefix}_description`](description.data.get());
                });
                specification.model.document.on('change', function(){
                    that[`set_${store_prefix}_specification`](specification.data.get());
                });
            }, 300);
        },
        check_selected_categories: function(){
            setTimeout(() => {
                for (let index = 0; index < this.selected_cats.length; index++) {
                    const i = this.selected_cats[index];
                    let el = document.querySelector(`input[data-id="${i.id}"]`);
                    if(el){
                        el.checked = true;
                        (function check_parent(el){
                            if(el.parentNode){
                                if(el.parentNode.classList?.contains('list')){
                                    el.parentNode.classList.add('d-block');
                                }
                                check_parent(el.parentNode)
                            }
                        })(el)
                    }
                }
            }, 500);
        }
    },
    computed: {
        ...mapGetters({
            selected_cats: `get_category_selected`,
            [`get_${store_prefix}`]: `get_${store_prefix}`
        })
    }
};
</script>

<style>
</style>
