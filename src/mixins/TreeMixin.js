import Tree from '@/lib/Tree'
import initKeyboardNavigation from '@/utils/keyboardNavigation'

function initEvents(vm) {
  vm.tree.$on('node:selected', node => {
    vm.$emit('input', node)
  })
}

export default {
  mounted() {
    let tree = new Tree(this)
    let dataProvider

    this.tree = tree
    this._provided.tree = tree

    // Yeah... nice check!
    if (this.data && this.data.then) {
      dataProvider = this.data
      this.loading = true
    } else {
      dataProvider = Promise.resolve(this.data)
    }

    dataProvider.then(data => {
      this.model = tree.parse(data, this.options.modelParse)
      this.tree.setModel(this.model)

      if (this.loading) {
        this.loading = false
      }
    })

    if (false !== this.options.keyboardNavigation) {
      initKeyboardNavigation(tree)
    }

    initEvents(this)
  },

  methods: {
    selected() {
      return this.tree.selected()
    },

    checked() {
      return this.tree.checked()
    },

    append(criteria, node) {
      // append to model
      if (!node) {
        return this.tree.addToModel(criteria, this.tree.model.length)
      }

      return this.tree.append(criteria, node)
    },

    prepend(criteria, node) {
      if (!node) {
        return this.tree.addToModel(criteria, 0)
      }

      return this.tree.prepend(criteria, node)
    },

    addChild(criteria, node) {
      return this.append(criteria, node)
    },

    remove(criteria, multiple) {
      return this.tree.remove(criteria, multiple)
    },

    before(criteria, node) {
      if (!node) {
        return this.prepend(criteria)
      }

      return this.tree.before(criteria, node)
    },

    after(criteria, node) {
      if (!node) {
        return this.append(criteria)
      }

      return this.tree.after(criteria, node)
    },

    find(criteria, multiple) {
      return this.tree.find(criteria, multiple)
    },

    findAll(criteria) {
      return this.tree.find(criteria, true)
    },

    recursiveDown() {

    },

    expandReqursice() {

    }
  }

};
