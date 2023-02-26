<template>
    <ul :class="`list`">
        <div class="left_line"></div>
        <li v-if="list[0] && list[0].parent_id == 0">
            <div class="details">
                <input type="radio" name="parent_id" :value="0" checked  class="form-check-input">
                <div class="title">
                    no parent
                </div>
            </div>
        </li>
        <li v-for="category in list" :key="category.id">
            <div class="details">
                <input type="radio" name="parent_id" :value="category.id" :data-id="category.id"  class="form-check-input">
                <div class="title">
                    {{category.name}}
                    <!-- {{category.id}} -->
                </div>
                <div @click="show_child($event)" v-if="category.child && category.child.length" class="collpse">
                    <i class="fa fa-plus fa-minus"></i>
                </div>
            </div>
            <cat-list-radio
                v-if="category.child && category.child.length"
                :id="category.id"
                :parent="category.parent"
                :list="category.child">
            </cat-list-radio>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'cat-list-radio',
    props: {
        list: {
            type: Array,
            default: [],
            required: true,
        },
        parent: {
            type: [Number,String]
        },
        id: {
            type: [Number,String]
        },
    },
    methods: {
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
        show_child: function (event) {
            let target = event.currentTarget.parentNode.nextElementSibling;
            // let parent_ul = event.currentTarget.parentNode.parentNode.parentNode;
            if (target) {
                event.currentTarget.children[0].classList.toggle("fa-plus");
                target.classList.toggle("d-block");
            } else {
                throw new Error("target not found");
            }
            this.calc_left_line();
        },
    }
}
</script>

<style>

</style>
