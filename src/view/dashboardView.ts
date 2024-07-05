import { 
	ItemView,
	WorkspaceLeaf 
} from "obsidian";

import Root from "./components/Root.svelte";

export const DASHBOARD_VIEW = "dashboard-view";

export class DashboardView extends ItemView {
  component: Root;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return DASHBOARD_VIEW;
  }

  getDisplayText() {
	return "Dashboard View";
  }

  async onOpen() {
    this.component = new Root({
      target: this.contentEl,
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}
