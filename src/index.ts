import './index.css'
import Typer from './typer'

setTimeout(() => {
    new Typer(document.getElementById('words')).type(
        "Here's nothing, you idiot! 😮"
    )
}, Math.random() * 2000 + 3000)
