<template>
    <ul :class="`list`">
        <div class="left_line"></div>

        <li v-for="category in child" :key="category.id">
            <div class="details">
                <input type="checkbox" :data-id="category.id" @change="selectCat(category)" class="form-check-input">
                <div class="title">
                    {{category.name}}
                    <!-- {{category.id}} -->
                </div>
                <div @click="show_child($event)" v-if="category.child && category.child.length" class="collpse">
                    <i class="fa fa-plus fa-minus"></i>
                </div>
                <div @click.prevent="append_sub_cat_form($event)" class="append_sub_btn"><i class="fa fa-plus"></i> add sub category</div>
            </div>
            <nested-cat-list
                v-if="category.child && category.child.length"
                :id="category.id"
                :parent="category.parent"
                :child="category.child">
            </nested-cat-list>
            <ul v-else class="list">
                <div class="left_line"></div>
                <new-cat-li :parent="category.id" :remove_new_child_form="remove_new_child_form" :calc_left_line="calc_left_line"></new-cat-li>
            </ul>
        </li>
        <new-cat-li :parent="id" :remove_new_child_form="remove_new_child_form" :calc_left_line="calc_left_line"></new-cat-li>
    </ul>
</template>

<script>
import { mapMutations } from 'vuex';
import NewCatLi from './NewCatLi.vue';
import PageSetup from '../PageSetup';
const {store_prefix} = PageSetup;
export default {
    name: "nested-cat-list",
    components: { NewCatLi },
    props: ["child", "array_depth", "task_depth", "id", "parent"],
    created: function () {

    },
    data: function () {
        return {
            selected_el: {},
            child_depth: 0,
        };
    },
    methods: {
        ...mapMutations({
            selectCat: `set_selected_${store_prefix}s`,
        }),
        calc_left_line: function () {
            setTimeout(() => {
                document.querySelectorAll(".list").forEach((i) => {
                    let left_line = i.children[0];
                    let last_child = i.children[i.children.length - 2];
                    left_line.style.height = "100%";
                    left_line.style.height =
                        left_line.clientHeight -
                        last_child.clientHeight +
                        29 +
                        "px";

                    let child_one_classlist = i.children[1].classList;
                    if (
                        child_one_classlist.contains("new_cat_li") &&
                        !child_one_classlist.contains("active")
                    ) {
                        left_line.style.height = "0%";
                    }
                });
            }, 30);
        },
        remove_new_child_form: function () {
            document
                .querySelectorAll(".new_cat_li")
                .forEach((i) => i.classList.remove("active"));
        },
        show_child: function (event) {
            let target = event.currentTarget.parentNode.nextElementSibling;
            // let parent_ul = event.currentTarget.parentNode.parentNode.parentNode;
            this.remove_new_child_form();
            if (target) {
                event.currentTarget.children[0].classList.toggle("fa-plus");
                target.classList.toggle("d-block");
            } else {
                throw new Error("target not found");
            }
            this.calc_left_line();
        },
        append_sub_cat_form: function (event) {
            let parent_li = event.currentTarget.parentNode.parentNode;
            this.remove_new_child_form();
            if (parent_li.children.length > 1) {
                let child_ul = parent_li.children[1];
                child_ul.classList.add("d-block");
                child_ul.children[ child_ul.children.length - 1 ].classList.toggle("active");
                document.querySelector(".new_cat_li.active input").focus();
            }
            this.calc_left_line();
        },
        randomLightHexColor: function() {
            // Generate a random number between 128 and 255 for each RGB value
            const red = Math.floor(Math.random() * 128) + 128;
            const green = Math.floor(Math.random() * 128) + 128;
            const blue = Math.floor(Math.random() * 128) + 128;

            // Convert the RGB values to hex format
            const hex = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

            return hex;
        }
    },
}
</script>

<style>

</style>
