const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    item.style.backgroundColor = 'lightgray'
    const favbtn = document.createElement('button')
    const delbtn = document.createElement('button')

    favbtn.textContent = 'Fav'
    delbtn.textContent = 'Delete'
    favbtn.style.backgroundColor = 'cornflowerBlue'
    delbtn.style.backgroundColor = "Red"
    favbtn.style.position = 'absolute'
    favbtn.style.right = '60%'
    delbtn.style.position = 'absolute'
    delbtn.style.right = '40%'
    favbtn.style.marginTop = '4px'
    delbtn.style.marginTop = '4px'
    favbtn.style.borderRadius = '7px'
    delbtn.style.borderRadius = '7px'
    favbtn.style.width = '6rem'
    delbtn.style.width = '8rem'


    favbtn.addEventListener('click', ()=> {
        if (item.style.backgroundColor == 'lightgray') {
            item.style.backgroundColor = 'gold'}
        else {item.style.backgroundColor = 'lightgray' }
                    })
    delbtn.addEventListener('click', ()=> {item.parentNode.removeChild(item)})
    item.appendChild(favbtn)
    item.appendChild(delbtn)
    return item
  },
    
  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    const listItem = this.renderListItem(flick)
    this.flicks[flick.id - 1] = flick.name
    this.list.appendChild(listItem)

    this.max ++
  },


}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})