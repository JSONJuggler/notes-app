const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }


}

const removeNote = (title) => {
    const notes = loadNotes()
    const leftoverNotes=notes.filter((note) => note.title !== title)

    if (leftoverNotes.length < notes.length) {
        console.log(chalk.inverse.red('Note removed!'))
        saveNotes(leftoverNotes)
    } else {
        console.log(chalk.inverse.green('No note found!'))
    }
}

const listNotes = () => {
    console.log(chalk.green.bold('Your notes'))
    notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    notes = loadNotes()
    const noteToRead=notes.find((note) => note.title === title)
    if (noteToRead) {
        console.log(chalk.green.bold(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}