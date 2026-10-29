import { describe, it } from "vitest"
import { Ghostbird } from "./testbench/ghostbird"

describe("Ghostbird", () => {
  it("should send initial text to server when started from toolbar", async ({ expect }) => {
    const sut = makeGhostbird()
    sut.startFromToolbar({ id: 42 })
    sut.composeBody.innerText = "hello"

    let sent = await sut.sendsToServer()
    await sut.closeSession()

    expect(sent).to.be.deep.equal({
      text: "hello",
      title: "subject",
      url: "test-id.localhost",
      selections: [{ start: 0, end: 0 }],
      syntax: "",
    })
  })

  it("should apply text from server to the compose body", async ({ expect }) => {
    const sut = makeGhostbird()
    sut.startFromToolbar({ id: 42 })
    sut.composeBody.innerText = "hello"

    await sut.sendsToServer()
    await sut.receives("hello, world")
    await sut.closeSession()

    expect(sut.composeBody.textContent).equals("hello, world")
  })
})

function makeGhostbird(): Ghostbird {
  return new Ghostbird({
    body: document.body,
    selection: getSelection() as Selection,
  })
}
