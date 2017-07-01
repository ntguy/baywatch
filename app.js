const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = !flick.fav

    if (flick.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }
  },

  removeFlick(flick, ev) {
    // remove from the DOM
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    // remove from the array
    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  },

  changeFlick(flick,ev) {
        const edit = prompt('Enter a new name:','New Flick Name');
        const listItem = ev.target.closest('.flick')
        listItem.querySelector('.flick-name').textContent = edit
        flick.name = edit
  },

  upFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    const i = this.flicks.indexOf(flick)
    if(i > 0) {
      const temp = this.flicks[i]
      this.flicks[i] = this.flicks[i-1]
      this.flicks[i-1] = temp 
      this.list.insertBefore(listItem, listItem.previousSibling)
    }
  },

  downFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    const i = this.flicks.indexOf(flick)
    if(i < this.flicks.length - 1) {
      const temp = this.flicks[i]
      this.flicks[i] = this.flicks[i+1]
      this.flicks[i+1] = temp       
      this.list.insertBefore(listItem, listItem.nextSibling.nextSibling)
    } 
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name
    
    item
      .querySelector('button.remove')
      .addEventListener(
        'click', 
        this.removeFlick.bind(this, flick)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click', 
        this.favFlick.bind(this, flick)
      )
    
     item
      .querySelector('button.up')
      .addEventListener(
        'click', 
        this.upFlick.bind(this, flick)
      )

     item
      .querySelector('button.edit')
      .addEventListener(
        'click', 
        this.changeFlick.bind(this, flick)
      )

      item
      .querySelector('button.down')
      .addEventListener(
        'click',
        this.downFlick.bind(this, flick) 
      )

    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      fav: false,
    }

    this.flicks.unshift(flick)

    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstElementChild)

    this.max ++
    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})