// state list
const state = {
    company_info: {
        'company_name': "Ctgcomputer ltd",
        'address': [
            {
                "building": "Computer City Centre (Multiplan)",
                "lane": "",
                "shop": "Level: 4, Shop: 407-409, 69-71",
                "area": "New Elephant Road",
                "division": "Dhaka",
            }
        ],
        'mobile_no': [
            '01733-080350'
        ],
        'email': 'ctgcomputercentre2008@gmail.com'
    },
};

// get state
const getters = {
    get_company_info: state => state.company_info,
};

// actions

const actions = {
    
}

// mutators
const mutations = {
    
};


export default {
    state,
    getters,
    actions,
    mutations,
};
