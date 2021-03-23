import ComponentsBuilder from "./components.js"

export default class TerminalController {
    constructor() { }

    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #onMessageReceived({ screen, chat }) {
        return msg => {
            const { userName, message } = msg
            chat.addItem(`{bold}${userName}{/}: ${message}`)
            screen.render()
        }
    }

    #registerEvents(eventEmitter, components) {
        eventEmitter.on('message:received', this.#onMessageReceived(components))


    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Leonardo Sousa' })
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .build()

        this.#registerEvents(eventEmitter, components)

        components.input.focus()
        components.screen.render()

        setInterval(() => {
            eventEmitter.emit('message:received', { message: 'hey', userName: 'leonardo' })
            eventEmitter.emit('message:received', { message: 'ho', userName: 'camila' })
        }, 2000);

    }
}