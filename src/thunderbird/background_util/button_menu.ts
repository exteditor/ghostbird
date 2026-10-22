import type { IButtonMenu, MenuItem, MenuShownInfo } from "src/app-background"

/**
 * Controls the context menu on the toolbar button
 */
export class ButtonMenu implements IButtonMenu {
  static isSingleton = true

  private initWork: Promise<void> | undefined

  constructor(private readonly messenger: typeof global.messenger) {}

  isInitialized(): boolean {
    return Boolean(this.initWork)
  }

  initItems(menuItems: ReadonlyArray<MenuItem>, _currentShown: MenuShownInfo | undefined): Promise<void> {
    if (this.initWork) {
      console.debug("ButtonMenu is already initialized; Skip creating menu items.")
    }
    this.initWork ??= this.createMenuItems(menuItems)

    return this.initWork
  }

  async createMenuItems(menuItems: ReadonlyArray<MenuItem>): Promise<void> {
    // Load a flag to avoid creating menu in case of MV3 suspension
    if (await this.loadInitialized()) {
      return
    }
    await this.createMenu(menuItems)
    await this.saveInitialized()
  }

  private saveInitialized(): Promise<void> {
    return this.messenger.storage.session.set({ buttonMenuInitialized: true })
  }

  private async loadInitialized(): Promise<boolean> {
    let got = await this.messenger.storage.session.get("buttonMenuInitialized")
    console.info(got)
    let { buttonMenuInitialized } = got
    return Boolean(buttonMenuInitialized)
  }

  private async createMenu(menuItems: readonly MenuItem[]): Promise<void> {
    await this.messenger.menus.removeAll()
    await Promise.all(menuItems.map((item) => this.createMenuItem(item)))
    await this.messenger.menus.refresh()
  }

  private createMenuItem({ id, label, icon }: MenuItem): Promise<void> {
    const contexts: messenger.menus.ContextType[] = ["compose_action"]

    let { promise, reject, resolve } = Promise.withResolvers<void>()
    this.messenger.menus.create(
      {
        id,
        title: this.messenger.i18n.getMessage(label),
        icons: icon,
        contexts,
        // `command` option doesn't seem to work as of TB128, so we use `onclick` event instead
      },
      () => {
        if (this.messenger.runtime.lastError) {
          reject(this.messenger.runtime.lastError)
        } else {
          console.debug(`Menu item ${id} created`)
          resolve()
        }
      },
    )

    return promise
  }
}
