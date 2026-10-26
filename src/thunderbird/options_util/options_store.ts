import type { IOptionsStore } from "src/app-options"
import type { IStoredOptionsLoader, StoredOptions } from "src/ghosttext-adaptor"
import { PromisifyingQueue } from "src/util"
import type OptionsSync from "webext-options-sync"

/** A wrapper of OptionsSync responsible for loading and saving options from storage */
export class OptionsStore implements IStoredOptionsLoader, IOptionsStore {
  static isSingleton = true
  static aliases = ["StoredOptionsLoader"]

  private optionsSync: OptionsSync<StoredOptions> | undefined

  constructor(
    private readonly optionsSyncCtor: typeof OptionsSync,
    private readonly storedOptionsDefaults: StoredOptions,
  ) {}

  private get options(): OptionsSync<StoredOptions> {
    this.optionsSync ??= new this.optionsSyncCtor({
      storageType: "local",
      defaults: this.storedOptionsDefaults,
    })
    return this.optionsSync
  }

  load(): Promise<StoredOptions> {
    return this.options.getAll()
  }

  async syncForm(form: HTMLFormElement): Promise<PromisifyingQueue<"saved" | "error">> {
    // Do a full clear of the options when the form is reset
    form.addEventListener("reset", async (e) => {
      try {
        e.preventDefault()
        await this.options.setAll(this.options.defaults)

        // Restart sync to let OptionsStore update the form
        await this.options.syncForm(form)

        q.pushReceived("saved")
      } catch {
        q.pushReceived("error")
      }
    })

    let q = new PromisifyingQueue<"saved" | "error">()
    form.addEventListener("options-sync:save-success", () => {
      q.pushReceived("saved")
    })
    form.addEventListener("options-sync:save-error", () => {
      q.pushReceived("error")
    })

    await this.options.syncForm(form)

    return q
  }

  /** Opens the browser’s file picker to import options from a previously-saved JSON file */
  importFromFile(): Promise<void> {
    return this.options.importFromFile()
  }

  /** Opens the browser’s "save file" dialog to export options to a JSON file */
  exportToFile(): Promise<void> {
    return this.options.exportToFile()
  }
}
