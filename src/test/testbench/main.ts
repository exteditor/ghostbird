import { Ghostbird } from "./ghostbird"

class GhostbirdTestbenchElement extends HTMLElement {
  connectedCallback(): void {
    const startButton = this.$<HTMLButtonElement>(".startButton")
    const stopButton = this.$<HTMLButtonElement>(".stopButton")
    const composeWindow = this.$<HTMLIFrameElement>(".composeWindow")
    const externalEditor = this.$<HTMLTextAreaElement>(".externalEditor")

    const listen = (): void => listenTo(startButton, stopButton, composeWindow, externalEditor)

    if (composeWindow.contentDocument?.body?.textContent) {
      listen()
    } else {
      composeWindow.addEventListener("load", listen, { once: true })
    }
  }

  private $<E extends HTMLElement>(selector: string): E {
    let e = this.querySelector<E>(selector)
    if (!e) {
      throw Error(`couldn't find the element [${selector}]`)
    }
    return e
  }
}

function listenTo(
  startButton: HTMLButtonElement,
  stopButton: HTMLButtonElement,
  composeWindow: HTMLIFrameElement,
  externalEditor: HTMLTextAreaElement,
): void {
  const composeWindowDocument = composeWindow.contentDocument
  const composeWindowSelection = composeWindow.contentWindow?.getSelection()
  const composeWindowBody = composeWindowDocument?.body as HTMLBodyElement
  if (!composeWindowDocument) {
    throw Error("Could not get composeWindow document")
  }
  if (!composeWindowBody) {
    throw Error("Could not get composeWindow body")
  }
  if (!composeWindowSelection) {
    throw Error("Could not get composeWindow selection")
  }
  composeWindowDocument.designMode = "on"
  externalEditor.disabled = false

  let ghostbird: Ghostbird | undefined

  startButton.addEventListener("click", async () => {
    startButton.disabled = true

    ghostbird = new Ghostbird({
      body: composeWindowBody,
      selection: composeWindowSelection,
    })
    ghostbird.startFromToolbar({ id: 42 })

    const res = await ghostbird.sendsToServer()
    console.info({ res })
    if (res) {
      externalEditor.value = res.text
    }

    stopButton.disabled = false
  })

  externalEditor.addEventListener("input", () => {
    return ghostbird?.receives(externalEditor.value)
  })

  stopButton.addEventListener("click", async () => {
    await ghostbird?.closeSession()
    ghostbird = undefined
    startButton.disabled = false
    stopButton.disabled = true
  })
}

customElements.define("ghostbird-testbench", GhostbirdTestbenchElement)
