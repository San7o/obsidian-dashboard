import { 
	App,
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting 
} from 'obsidian';

import { 
	DashboardView, 
	DASHBOARD_VIEW
} from "./view/dashboardView";


interface DashboardPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: DashboardPluginSettings = {
	mySetting: 'default'
}

export default class DashboardPlugin extends Plugin {
	settings: DashboardPluginSettings;

	async onload() {
		this.natigation = true;

		this.registerView(
			DASHBOARD_VIEW,
			(leaf) => new DashboardView(leaf)
		);

		const ribbonIconEl =
			this.addRibbonIcon('star',
							   'Dashboard',
							   (evt: MouseEvent) => {
				this.activateView();
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign(
			{}, 
			DEFAULT_SETTINGS, 
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

    async activateView() {
      const { workspace } = this.app;

      let leaf: WorkspaceLeaf | null = null;
      const leaves = 
		  workspace.getLeavesOfType(DASHBOARD_VIEW);

      if (leaves.length > 0) {
        leaf = leaves[0];
      } else {
        leaf = workspace.getLeaf(false);
        await leaf.setViewState(
			{ 
				type: DASHBOARD_VIEW, 
				active: true
			});
      }
      workspace.revealLeaf(leaf);
  }
}
