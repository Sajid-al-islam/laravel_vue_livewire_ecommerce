Vue.component("new-cat-li", {
    props: ["remove_new_child_form", "calc_left_line", "parent"],
    methods: {
        save: function () {
            let value = {
                parent_id: this.parent,
                value: this.$refs.input.value,
            };
            console.log(value);
        },
        close: function () {
            this.$refs.input.value = "";
            this.remove_new_child_form();
            this.calc_left_line();
        },
    },
    template: `
        <li class="new_cat_li">
            <div class="details">
                <input ref="input" @keyup.enter="save" @keyup.esc="close" class="form-control"/>
                <button @click.prevent="close">CANCEL</button>
                <button @click.prevent="save">DONE</button>
            </div>
        </li>
    `,
});

Vue.component("taskList", {
    props: ["child", "array_depth", "task_depth", "id", "parent"],
    created: function () {
        this.child_depth = this.array_depth() - 1;
        // console.log(this.task_depth);
    },
    data: function () {
        return {
            selected_el: {},
            child_depth: 0,
        };
    },
    methods: {
        focus_input: function () {
            setTimeout(() => {
                document.querySelector(".task_list textarea")?.focus();
            }, 200);
        },
        title_to_input: function (item) {
            if (item) {
                console.log(item.title);
                item.title_edit = true;
                this.focus_input();
            }
        },
        move_up: function (child, index) {
            let target = { ...child[index] };
            if (index > 0 && child.length > index) {
                let upper = { ...child[index - 1] };
                child.splice(index - 1, 1);
                child.splice(index - 1, 0, target);
                child.splice(index, 1);
                child.splice(index, 0, upper);
            }
        },
        move_down: function (child, index) {
            let target = { ...child[index] };
            if (index < this.child.length && child.length > index + 1) {
                let down = { ...child[index + 1] };
                child.splice(index + 1, 1);
                child.splice(index + 1, 0, target);
                child.splice(index, 1);
                child.splice(index, 0, down);
            }
        },
        remove_task: function (child = [], index) {
            child.splice(index, 1);
        },
        show_input_el: function (item, show_el = true) {
            item.append_task_el = show_el;
            item.task_collapse = false;
            if (item && show_el) {
                selected_el = item;
                this.focus_input();
            }
        },
        add_el: function (task) {
            title = event.target.value || this.$refs.input[0].value;
            task.child.unshift({
                id: task.child.length + 1 + Math.random(),
                title,
                title_edit: false,
                days: 0,
                append_task_el: false,
                task_collapse: false,
                child: [],
            });
            task.append_task_el = false;
        },
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
                child_ul.children[
                    child_ul.children.length - 1
                ].classList.toggle("active");
                document.querySelector(".new_cat_li.active input").focus();
            }
            this.calc_left_line();
        },
    },
    template: `
        <ul class="list">
            <div class="left_line"></div>

            <li v-for="category, index in child" :key="category.id">
                <div class="details">
                    <input type="checkbox" class="form-check-input">
                    <div class="title">
                        {{category.name}}
                        {{category.id}}
                    </div>
                    <div @click="show_child($event)" v-if="category.child && category.child.length" class="collpse">
                        <i class="fa fa-plus fa-minus"></i>
                    </div>
                    <button @click.prevent="append_sub_cat_form($event)" class="append_sub_btn"><i class="fa fa-plus"></i> add sub category</button>
                </div>
                <task-list
                    v-if="category.child && category.child.length"
                    :array_depth="array_depth"
                    :task_depth="task_depth+1"
                    :id="category.id"
                    :parent="category.parent"
                    :child="category.child">
                </task-list>
                <ul v-else class="list">
                    <div class="left_line"></div>
                    <new-cat-li :parent="category.id" :remove_new_child_form="remove_new_child_form" :calc_left_line="calc_left_line"></new-cat-li>
                </ul>
            </li>
            <new-cat-li :parent="id" :remove_new_child_form="remove_new_child_form" :calc_left_line="calc_left_line"></new-cat-li>
        </ul>
    `,
});
new Vue({
    el: "#app",
    data: function () {
        return {
            child: [],
            selected_el: {},
        };
    },
    created: function () {
        this.reset();
    },
    methods: {
        arrayDepth: function (arr = this.child) {
            if (!Array.isArray(arr)) {
                return 0;
            } else {
                let maxDepth = 0;
                for (let i = 0; i < arr.length; i++) {
                    const depth = this.arrayDepth(arr[i].child);
                    if (depth > maxDepth) {
                        maxDepth = depth;
                    }
                }
                return maxDepth + 1;
            }
        },
        focus_input: function () {
            setTimeout(() => {
                document.querySelector(".task_list textarea")?.focus();
            }, 200);
        },
        add_new: function () {
            this.child.push({
                id: this.child.length + 1,
                title: "phase " + (this.child.length + 1),
                title_edit: true,
                days: 0,
                append_task_el: false,
                task_collapse: false,
                child: [],
            });
            this.focus_input();
        },
        reset: function () {
            // fetch('http://127.0.0.1:8000/cat')
            //     .then(res=>res.json())
            //     .then(res=>{
            //         // this.child = res;
            //     })

            // this.child = [
            //     {
            //         id: 1,
            //         title: "Analysis",
            //         title_edit: false,
            //         days: 0,
            //         append_task_el: false,
            //         task_collapse: true,
            //         child: [
            //             {
            //                 title: "Analysis and design stage and gather data ",
            //                 title_edit: false,
            //                 days: 0,
            //                 append_task_el: false,
            //                 task_collapse: false,
            //                 child: [
            //                     {
            //                         title: "analys related softwares",
            //                         title_edit: false,
            //                         days: 0,
            //                         append_task_el: false,
            //                         task_collapse: false,
            //                         child: [],
            //                         id: 1,
            //                     },
            //                 ],
            //                 id: 1,
            //             },
            //         ],
            //     },
            // ];

            // console.log(
            // 	this.child.map((i, index) => {
            // 		i.id = index + 1;
            // 		i.child = i.child.map((j, index2) => {
            // 			j.id = index2 + 1;
            //             j.task_collapse = false;
            // 			j.child.map((k, index3) => {
            // 				k.id = index3 + 1;
            //                 k.task_collapse = false;
            // 				return k;
            // 			});
            // 			return j;
            // 		});
            // 		return i;
            // 	})
            // );
        },
    },
});

// let parents = category.filter((i) => !i.parent_id > 0);
// let childs = category.filter((i) => i.parent_id > 0);

let parentss = category
    .filter((i) => i.parent_id == 0)
    .map((p) => {
        return {
            ...p,
            child: find_childs(
                childs,
                p
            ),
        };
    });

function find_childs(arr, item) {
    let temp = arr
        .filter((i) => i.parent_id == item.id)
        .map((i) => {
            return {
                ...i,
                child: find_childs(
                    arr.filter((i) => i.parent_id != item.id),
                    i
                ),
            };
        });
    return temp;
}

// console.log(parents, childs, parentss);
