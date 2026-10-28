export class BodyEditor {
  static isSingleton = true

  constructor(
    private readonly body: HTMLBodyElement,
    private readonly domParser: DOMParser,
  ) {}

  getBody(isPlainText: boolean): string {
    return (isPlainText ? this.body.innerText : this.body.innerHTML) ?? ""
  }

  applyEdit(body: string, isPlainText: boolean): void {
    if (isPlainText) {
      this.body.textContent = body
    } else {
      const doc = this.domParser.parseFromString(body, "text/html")
      this.body.innerHTML = ""
      this.body.append(...doc.body.childNodes)
    }
  }
}
