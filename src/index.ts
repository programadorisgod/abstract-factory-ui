import { Application } from "./main"
import { Platform } from "./utils/get-platform"
import '../src/style.css'
import '../src/css/styles.css'


document.addEventListener('DOMContentLoaded', () => {
    const platform = Platform.detectDevice()
    const factory = platform.getUIFactory()
    const app = new Application(factory)
    app.render()
})