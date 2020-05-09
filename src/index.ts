import './index.css'
import Typer from './typer'

setTimeout(async () => {
    await new Typer(document.getElementById('words')).type(
        "Here's nothing, you idiot! 😮"
    )
    setTimeout(() => {
        location.assign('https://yuja.wang')
    }, 2000)
}, Math.random() * 2000 + 3000)
