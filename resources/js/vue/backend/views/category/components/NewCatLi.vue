<template>
    <li class="new_cat_li">
        <div class="details">
            <input
                @keydown="save($event)"
                @keyup="()=>''"
                class="form-control"
            />
            <button @click.prevent="close">CANCEL</button>
            <button @click.prevent="save">DONE</button>
        </div>
    </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PageSetup from '../PageSetup';
const {store_prefix} = PageSetup;
export default {
    props: ["remove_new_child_form", "calc_left_line", "parent"],
    methods: {
        ...mapMutations({
            set_cat_json: `set_${store_prefix}_all_json`,
        }),
        save: function (e) {
            if(e.key == "Enter"){
                e.preventDefault();
            }
            if(e.key != "Enter" && e.target.nodeName == 'INPUT'){
                return 0;
            }
            let el = document.querySelector('.new_cat_li.active input');
            if(el){
                let value = {
                    "id": this.all_cat_json[this.all_cat_json.length-1].id + 1,
                    "name": el.value,
                    "parent_id": this.parent,
                };
                let temp = [...this.all_cat_json];
                temp.push(value);
                this.set_cat_json(temp);

                this.close();
            }
        },
        close: function () {
            let el = document.querySelector('.new_cat_li.active input');
            if(el){
                el.value = "";
                this.remove_new_child_form();
                this.calc_left_line();
            }
        },
    },
    computed: {
        ...mapGetters({
            all_cat_json: `get_${store_prefix}_all_json`
        })
    }
};
</script>

<style>
</style>
