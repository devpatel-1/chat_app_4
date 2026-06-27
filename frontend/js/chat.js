const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = document.querySelector('#send-message')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// ============================
// AUTO SCROLL
// ============================

const autoscroll = () => {

    const $newMessage = $messages.lastElementChild

    if (!$newMessage) return

    const newMessageStyles = getComputedStyle($newMessage)

    const newMessageMargin =
        parseInt(newMessageStyles.marginBottom)

    const newMessageHeight =
        $newMessage.offsetHeight + newMessageMargin

    const visibleHeight = $messages.offsetHeight

    const containerHeight = $messages.scrollHeight

    const scrollOffset =
        $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }

}

// ============================
// CONNECTION
// ============================

socket.on('connect', () => {
    console.log('Connected to GatherIn')
})

socket.on('disconnect', () => {
    console.log('Disconnected')
})

// ============================
// MESSAGE
// ============================

socket.on('message', (message) => {

    console.log(message)

    const html = Mustache.render(messageTemplate, {

        username: message.username,

    avatar: message.username
        .charAt(0)
        .toUpperCase(),

    message: message.text,

    createdAt: moment(message.createdAt)
        .format('hh:mm A'),

    isMe:
    message.username.trim().toLowerCase() ===
    username.trim().toLowerCase()

    })

    $messages.insertAdjacentHTML(
        'beforeend',
        html
    )

    autoscroll()

})

// ============================
// LOCATION
// ============================

socket.on('locationMessage', (message) => {

    console.log(message)

    const html = Mustache.render(
        locationMessageTemplate,
        {

        username: message.username,

        avatar: message.username
            .charAt(0)
            .toUpperCase(),

        url: message.url,

        createdAt: moment(message.createdAt)
            .format('hh:mm A'),

        isMe:
            message.username.trim().toLowerCase() ===
            username.trim().toLowerCase()

        }
    )

    $messages.insertAdjacentHTML(
        'beforeend',
        html
    )

    autoscroll()

})

// ============================
// SIDEBAR
// ============================

socket.on('roomData', ({ room, users }) => {

    const usersWithAvatar = users.map(user => ({
        ...user,
        avatar: user.username
            .charAt(0)
            .toUpperCase()
    }))

    const html = Mustache.render(
        sidebarTemplate,
        {
            room,
            users: usersWithAvatar
        }
    )

    document.querySelector('#sidebar').innerHTML =
        html

})

// ============================
// SEND MESSAGE
// ============================

$messageForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const message =
        e.target.elements.message.value.trim()

    if (!message) {
        return
    }

    $messageFormButton.disabled = true

    $messageFormButton.textContent = 'Sending...'

    socket.emit(
        'sendMessage',
        message,
        (error) => {

            $messageFormButton.disabled = false

            $messageFormButton.textContent = '➜'

            $messageFormInput.value = ''

            $messageFormInput.focus()

            if (error) {
                return console.log(error)
            }

            console.log('Message delivered!')

        }
    )

})

// ============================
// LOCATION
// ============================

$sendLocationButton.addEventListener(
    'click',
    () => {

        if (!navigator.geolocation) {
            return alert(
                'Geolocation is not supported by your browser.'
            )
        }

        $sendLocationButton.disabled = true

        $sendLocationButton.textContent =
            '...'

        navigator.geolocation.getCurrentPosition(
            (position) => {

                socket.emit(
                    'sendLocation',
                    {

                        latitude:
                            position.coords.latitude,

                        longitude:
                            position.coords.longitude

                    },

                    () => {

                        $sendLocationButton.disabled =
                            false

                        $sendLocationButton.textContent =
                            '📍'

                        console.log(
                            'Location shared!'
                        )

                    }
                )

            }
        )

    }
)

// ============================
// JOIN
// ============================

socket.emit(
    'join',
    {
        username,
        room
    },
    (error) => {

        if (error) {

            alert(error)

            location.href = '/'

        }

    }
)