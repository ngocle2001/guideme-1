// let messageButton = document.getElementById('mes-btn');
// let chatContainer = document.getElementById('chat-container')
let header = document.getElementsByClassName('header')[0]
let menu = header.children[1]
let mesBtn = menu.children[0]
let notiBtn = menu.children[1]

// console.log(notiBtn)

let mesBtnOn = 0
mesBtn.onclick = function () {
  if (mesBtnOn) {
    turnOff('mes-box')
  } else {
    turnOff('noti-box')
    turnOn('mes-box')
    showMes('./img/duydn.png', 'DuyDn', 'See you at 9.00 AM', '111')
    showMes('./img/duydn.png', 'nghanhVu', 'See you at 9.00 AM', '222')
    showMes('./img/duydn.png', 'ngoc', 'See you at 9.00 AM', '333')
  }
}

let notiBtnOn = 0
notiBtn.onclick = function () {
  if (notiBtnOn) {
    turnOff('noti-box')
  } else {
    turnOff('mes-box')
    turnOn('noti-box')
  }
}

function turnOff (classname) {
  if (classname === 'mes-box') {
    if (mesBtnOn) {
      mesBtnOn = 0
      let box = document.getElementsByClassName('mes-box')[0]
      document.body.removeChild(box)
    }
  }
  if (classname === 'noti-box') {
    if (notiBtnOn) {
      notiBtnOn = 0
      let box = document.getElementsByClassName('noti-box')[0]
      document.body.removeChild(box)
    }
  }
}

function turnOn (classname) {
  if (classname === 'mes-box') mesBtnOn = 1
  if (classname === 'noti-box') notiBtnOn = 1
  let box = newElement('DIV', classname)
  document.body.appendChild(box)
}

function newElement (type, classname = '', context = '') {
  let newEle = document.createElement(type)
  newEle.setAttribute('class', classname)
  newEle.innerHTML = context
  return newEle
}

function showMes (src, name, message, roomid) {
  
  let avatarContainer = newElement('DIV', 'avatar-container')
  let avatar = newElement('IMG', 'avatar')
  avatar.src = src
  avatarContainer.appendChild(avatar)
  
  let infoContainer = newElement('DIV', 'info-container')
  let _name = newElement('P', 'name', name)
  let _mes = newElement('P', 'mes', message)
  infoContainer.appendChild(_name)
  infoContainer.appendChild(_mes)

  let _time = newElement('P', 'time', '9:00')

  let mes = newElement('DIV', 'mes-container')
  mes.appendChild(avatarContainer)
  mes.appendChild(infoContainer)
  mes.appendChild(_time)

  mes.onclick = () => {
    if (chatContainer.childElementCount >= 2) chatContainer.removeChild(chatContainer.children[0])
    chatContainer.append(mesToChatContainer(roomid))
  }

  let box = document.getElementsByClassName('mes-box')[0]
  box.appendChild(mes)
}

function mesToChatContainer(roomid, messages = '', listPerson = '') {
  // tao chat trong chat-container
  let mes = newElement('DIV', 'chat')
  mes.setAttribute('roomid', roomid)

  // tao header
  let _header = newElement('DIV', 'header')
  
  // tao hinh
  let headerAvatarContainer = newElement('DIV', 'avatar-container')
  let headerAvatar = newElement('IMG', 'avatar')
  headerAvatar.src = './img/duydn.png'
  headerAvatarContainer.append(headerAvatar)
  
  // tao info
  let headerInfo = newElement('DIV', 'info')
  let headerName = newElement('P', 'name', 'Duydn')
  let headerStatus = newElement('P', 'status', 'Active')
  headerInfo.append(headerName)
  headerInfo.append(headerStatus)

  // tao nut X
  let headerExit = newElement('P', 'exit', '&times;')
  // add aciton
  headerExit.onclick = () => {
    chatContainer.removeChild(mes)
  }

  _header.append(headerAvatarContainer)
  _header.append(headerInfo)
  _header.append(headerExit)
  // add aciton
  _header.onclick = () => {
    let main = mes.children[1].style
    let status = main.display
    main.display = (status == 'none') ? 'block' : 'none'
  }

  let _body = newElement('DIV')
  // tao vai tin nhan gia
  let _mainMes = newElement('DIV', 'main-mess')
  
  let _message = newElement('DIV', 'message')
  let _avatarContainer = newElement('DIV', 'avatar-container')
  let _avatar = newElement('IMG', 'avatar')
  _avatar.src = './img/duydn.png'
  _avatarContainer.append(_avatar)
  let _content = newElement('DIV', 'content')
  let _name = newElement('DIV', 'name', 'Duydn')
  let _mes = newElement('DIV', 'mes', 'hello')
  _content.append(_name)
  _content.append(_mes)
  _message.append(_avatarContainer)
  _message.append(_content)
  
  let __myMessage = newElement('DIV', 'my-message')
  let __content = newElement('DIV', 'content')
  let __mes = newElement('SPAN', 'mes', 'lo lo con cac')
  __content.append(__mes)
  __myMessage.append(__content)
  
  _mainMes.append(_message)
  _mainMes.append(__myMessage)
  //_mainMes.append(_message)
  //_mainMes.append(__myMessage)
  
  // tao footer
  let _footer = newElement('DIV', 'footer')
  let _input = newElement('INPUT', 'input')
  _input.setAttribute('type', 'text')
  _input.setAttribute('placeholder', 'Type a message ...')
  let _toolContainer = newElement('DIV', 'tool-container')
  let _icon = newElement('I', 'fas fa-check-square')
  _toolContainer.append(_icon)
  //_toolContainer.append(_icon)
  //_toolContainer.append(_icon)
  
  _footer.append(_input)
  _footer.append(_toolContainer)
  _body.append(_mainMes)
  _body.append(_footer)
  
  mes.append(_header)
  mes.append(_body)
  
  // add action
  return mes
}

const room = {
  room1: {
    user1: {
      name: 'user1',
      messages: ['hi', 'hello', 'Nice to meet you', 'bye']
    }

  }
}
const user = {
  abcd1234: {
    name: 'Duydn',
    age: 18,
    sex: 'male'
  }
}


let chatContainer = document.body.getElementsByClassName('chat-container')[0]
let _room = document.querySelectorAll('[roomid]')
console.log(chatContainer)

_room.forEach(room => {
  console.log(room.children[0].children[2])
  room.children[0].children[2].onclick = () => {
    chatContainer.removeChild(room)
  }
  room.children[0].onclick = () => {
    let main = room.children[1].style
    let status = main.display
    main.display = (status == 'none') ? 'block' : 'none'
  }
})

let mesBox = document.getElementsByClassName('mes-box')[0]

