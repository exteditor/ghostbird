import type { IComposeWindow } from "src/ghosttext-adaptor"
import type { CommandId, IUiUtil } from "./api"
import type { ComposeActionNotifier } from "./compose_action_notifier"

/** Dispatches commands from the toolbar button, an item in the context menu, or keyboard shortcuts */
export class CommandHandler {
  static isSingleton = true
  constructor(
    private readonly composeActionNotifier: ComposeActionNotifier,
    private readonly uiUtil: IUiUtil,
  ) {}

  /**
   * Runs commands to the appropriate handlers
   * @param command The command to run
   * @param composeTab The tab to run the command on
   * @returns A promise that resolves when the command is done
   */
  runCommand(command: CommandId, composeTab: IComposeWindow): Promise<void> {
    console.info({ command, tabId: composeTab.tabId })
    switch (command) {
      case "start_ghostbird":
        return this.composeActionNotifier.start(composeTab)
      case "stop_ghostbird":
        return this.composeActionNotifier.stop(composeTab)
      case "toggle_ghostbird":
        return this.composeActionNotifier.toggle(composeTab)
      case "open_options":
        return this.uiUtil.openOptionsPage()
    }
    // We don't handle default here so that tsc checks for exhaustiveness
  }
}
