export default class CliConfig {
    static parseArguments(commands) {
        const cmd = new Map()

        for (const key in commands) {

            const index = parseInt(key)
            const command = commands[key]

            const commandPreffix = '--'
            if (!command.includes(commandPreffix)) continue;
            cmd.set(
                command.replace(commandPreffix, ''),
                commands[index + 1]
            )
        }

        return cmd

    }
}