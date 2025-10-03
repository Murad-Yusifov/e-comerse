export function formatName(name) {
    return name.trim().chartAt(0).upperCase() + name.trim().slice(1)
}

export function getTheMail(mail){
 return console.log(`Hello, ${mail}!`)
}