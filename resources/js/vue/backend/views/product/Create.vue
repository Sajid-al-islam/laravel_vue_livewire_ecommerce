<template>
    <div class="container">
        <div class="card list_card">
            <div class="card-header">
                <h4>Create</h4>
                <div class="btns">
                    <router-link :to="{ name: `All${route_prefix}` }" class="btn rounded-pill btn-outline-warning" >
                        <i class="fa fa-arrow-left me-5px"></i>
                        Back
                    </router-link>
                </div>
            </div>
            <form @submit.prevent="call_store(`store_${store_prefix}`,$event.target)" autocomplete="false" class="create_form">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="admin_form form_1">
                                <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Name`"
                                        :name="`product_name`"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`search keywords`"
                                        :name="`search_keywords`"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`Default price`"
                                        :name="`default_price`"
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

                                <!-- <div class=" form-group d-grid align-content-start gap-1 mb-2 " >
                                    <label for="category_id">Category</label>
                                    <select name="category_id" id="category_id" class="form-control">
                                        <option value="">Computer</option>
                                        <option value="">Laptop</option>
                                        <option value="">Monitor</option>
                                        <option value="">Desktop component</option>
                                    </select>
                                </div> -->

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`photo`"
                                        :name="`image`"
                                        :type="`file`"
                                        :accept="`image/*`"
                                        :multiple="true"
                                        :preview="true"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`stock`"
                                        :name="`track_inventory_on_the_variant_level_stock`"
                                        :type="`number`"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                    <input-field
                                        :label="`low stock`"
                                        :name="`track_inventory_on_the_variant_level_low_stock`"
                                        :type="`number`"
                                    />
                                </div>

                                <div class="form-group d-grid align-content-start full_width gap-1 mb-2 " >
                                    <label for="specification">Specification</label>
                                    <div id="specification">
                                        <p>product specifications</p>
                                    </div>
                                    <!-- <textarea class="form-control" id="specification" name="specification" :value="this[`get_${store_prefix}`]['description']"></textarea> -->
                                </div>

                                <div class="form-group d-grid align-content-start full_width gap-1 mb-2 " >
                                    <label for="description">Description</label>
                                    <div id="description">
                                        <p>product description</p>
                                    </div>
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
                                            />
                                        </div>

                                        <div class="form-group d-grid align-content-start gap-1 mb-2 " >
                                            <input-field
                                                :label="`product url`"
                                                :name="`product_url`"
                                            />
                                        </div>

                                        <div class="form-group full_width d-grid align-content-start gap-1 mb-2 " >
                                            <label for="meta_description">Meta Description</label>
                                            <textarea class="form-control" id="meta_description" name="meta_description"></textarea>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import InputField from '../components/InputField.vue'
/** store and route prefix for export object use */
import NestedCategoryModal from '../category/components/NestedCategoryModal.vue';
import PageSetup from './PageSetup';
const {route_prefix, store_prefix} = PageSetup;

export default {
    components: { InputField, NestedCategoryModal },
    data: function(){
        return {
            /** store prefix for JSX */
            store_prefix,
            route_prefix
        }
    },
    created: function () {
        this.initEditor();
    },
    methods: {
        ...mapActions([`store_${store_prefix}`]),
        ...mapMutations([
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

                let specification = await CKEDITOR.ClassicEditor
                    .create( document.querySelector( '#specification' ), window.ck_editor_config )
                    .catch( error => {
                        console.error( error );
                    } );

                description.model.document.on('change', function(){
                    that[`set_${store_prefix}_description`](description.data.get());
                });
                specification.model.document.on('change', function(){
                    that[`set_${store_prefix}_specification`](specification.data.get());
                });
            }, 300);
        }
    },
};
</script>

<style>
</style>
