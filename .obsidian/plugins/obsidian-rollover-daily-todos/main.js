'use strict';

var obsidian = require('obsidian');

const MAX_TIME_SINCE_CREATION = 5000; // 5 seconds

class RolloverTodosPlugin extends obsidian.Plugin {
	checkDailyNotesEnabled() {
		return this.app.vault.config.pluginEnabledStatus['daily-notes'];
	}

	getDailyNotesDirectory() {
		if (this.dailyNotesDirectory != null) {
			return this.dailyNotesDirectory;
		}

		this.dailyNotesDirectory = this.app.internalPlugins.plugins['daily-notes'].instance.options.folder;
		return this.dailyNotesDirectory;
	}

	getLastDailyNote() {
		const dailyNotesDirectory = this.getDailyNotesDirectory();
		
		const files = this.app.vault.getAllLoadedFiles()
			.filter(file => file.path.startsWith(dailyNotesDirectory))
			.filter(file => file.basename != null)
			.sort((a, b) => new Date(b.basename).getTime() - new Date(a.basename).getTime());

		return files[1];
	}

	async getAllUnfinishedTodos(file) {
		const contents = await this.app.vault.read(file);
		const unfinishedTodosRegex = /\t*- \[ \].*/g;
		const unfinishedTodos = Array.from(contents.matchAll(unfinishedTodosRegex)).map(([todo]) => todo);
		return unfinishedTodos;
	}

	async onload() {
		this.settings = await this.loadData() || { templateHeading: 'none' };

		if (!this.checkDailyNotesEnabled()) {
			new obsidian.Notice('Daily notes plugin is not enabled. Enable it and then reload Obsidian.', 2000);
		}

		this.addSettingTab(new RollverTodosSettings(this.app, this));

		this.registerEvent(this.app.vault.on('create', async (file) => {
			// is a daily note
			const dailyNotesDirectory = this.getDailyNotesDirectory();
			if (!file.path.startsWith(dailyNotesDirectory)) return;

			// is today's daily note
			const today = new Date();
			if (getISOFormattedDate(today) !== file.basename) return;

			// was just created
			if (today.getTime() - file.stat.ctime > MAX_TIME_SINCE_CREATION) return;

			const lastDailyNote = this.getLastDailyNote();
			if (lastDailyNote == null) return;

			const unfinishedTodos = await this.getAllUnfinishedTodos(lastDailyNote);
			
			let dailyNoteContent = await this.app.vault.read(file);

			if (this.settings.templateHeading !== 'none') {
				const heading = this.settings.templateHeading;
				dailyNoteContent = dailyNoteContent.replace(heading, heading + '\n' + unfinishedTodos.join('\n') + '\n');
			} else {
				dailyNoteContent += '\n' + unfinishedTodos.join('\n');
			}

			await this.app.vault.modify(file, dailyNoteContent);
		}));
	}
}

class RollverTodosSettings extends obsidian.PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	async getTemplateHeadings() {
		const template = this.app.internalPlugins.plugins['daily-notes'].instance.options.template;
		if (!template) return [];
		
		const file = this.app.vault.getAbstractFileByPath(template + '.md');
		const templateContents = await this.app.vault.read(file);
		const allHeadings = Array.from(templateContents.matchAll(/#{1,} .*/g)).map(([heading]) => heading);
		return allHeadings;
	}

	async display() {
		const templateHeadings = await this.getTemplateHeadings();

		this.containerEl.empty();
		new obsidian.Setting(this.containerEl)
			.setName('Template heading')
			.setDesc('Which heading from your template should the todos go under')
			.addDropdown((dropdown) => dropdown
				.addOptions({
					...templateHeadings.reduce((acc, heading) => {
						acc[heading] = heading;
						return acc;
					}, {}),
					'none': 'None' 
				})
				.setValue(this.plugin?.settings.templateHeading)
				.onChange(value => {
					this.plugin.settings.templateHeading = value;
					this.plugin.saveData(this.plugin.settings);
				})
			);
		}
}

/**
 * Return an ISO formatted date only for the users current timezone.
 */
function getISOFormattedDate(date) {
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");
	return date.getFullYear() + "-" + month + "-" + day;
}

module.exports = RolloverTodosPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4sIFNldHRpbmcsIFBsdWdpblNldHRpbmdUYWIgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5jb25zdCBNQVhfVElNRV9TSU5DRV9DUkVBVElPTiA9IDUwMDA7IC8vIDUgc2Vjb25kc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sbG92ZXJUb2Rvc1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0Y2hlY2tEYWlseU5vdGVzRW5hYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmFwcC52YXVsdC5jb25maWcucGx1Z2luRW5hYmxlZFN0YXR1c1snZGFpbHktbm90ZXMnXTtcclxuXHR9XHJcblxyXG5cdGdldERhaWx5Tm90ZXNEaXJlY3RvcnkoKSB7XHJcblx0XHRpZiAodGhpcy5kYWlseU5vdGVzRGlyZWN0b3J5ICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGFpbHlOb3Rlc0RpcmVjdG9yeTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRhaWx5Tm90ZXNEaXJlY3RvcnkgPSB0aGlzLmFwcC5pbnRlcm5hbFBsdWdpbnMucGx1Z2luc1snZGFpbHktbm90ZXMnXS5pbnN0YW5jZS5vcHRpb25zLmZvbGRlcjtcclxuXHRcdHJldHVybiB0aGlzLmRhaWx5Tm90ZXNEaXJlY3Rvcnk7XHJcblx0fVxyXG5cclxuXHRnZXRMYXN0RGFpbHlOb3RlKCkge1xyXG5cdFx0Y29uc3QgZGFpbHlOb3Rlc0RpcmVjdG9yeSA9IHRoaXMuZ2V0RGFpbHlOb3Rlc0RpcmVjdG9yeSgpO1xyXG5cdFx0XHJcblx0XHRjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEFsbExvYWRlZEZpbGVzKClcclxuXHRcdFx0LmZpbHRlcihmaWxlID0+IGZpbGUucGF0aC5zdGFydHNXaXRoKGRhaWx5Tm90ZXNEaXJlY3RvcnkpKVxyXG5cdFx0XHQuZmlsdGVyKGZpbGUgPT4gZmlsZS5iYXNlbmFtZSAhPSBudWxsKVxyXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5iYXNlbmFtZSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS5iYXNlbmFtZSkuZ2V0VGltZSgpKTtcclxuXHJcblx0XHRyZXR1cm4gZmlsZXNbMV07XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXRBbGxVbmZpbmlzaGVkVG9kb3MoZmlsZSkge1xyXG5cdFx0Y29uc3QgY29udGVudHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xyXG5cdFx0Y29uc3QgdW5maW5pc2hlZFRvZG9zUmVnZXggPSAvXFx0Ki0gXFxbIFxcXS4qL2dcclxuXHRcdGNvbnN0IHVuZmluaXNoZWRUb2RvcyA9IEFycmF5LmZyb20oY29udGVudHMubWF0Y2hBbGwodW5maW5pc2hlZFRvZG9zUmVnZXgpKS5tYXAoKFt0b2RvXSkgPT4gdG9kbylcclxuXHRcdHJldHVybiB1bmZpbmlzaGVkVG9kb3M7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpIHx8IHsgdGVtcGxhdGVIZWFkaW5nOiAnbm9uZScgfTtcclxuXHJcblx0XHRpZiAoIXRoaXMuY2hlY2tEYWlseU5vdGVzRW5hYmxlZCgpKSB7XHJcblx0XHRcdG5ldyBOb3RpY2UoJ0RhaWx5IG5vdGVzIHBsdWdpbiBpcyBub3QgZW5hYmxlZC4gRW5hYmxlIGl0IGFuZCB0aGVuIHJlbG9hZCBPYnNpZGlhbi4nLCAyMDAwKVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgUm9sbHZlclRvZG9zU2V0dGluZ3ModGhpcy5hcHAsIHRoaXMpKVxyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignY3JlYXRlJywgYXN5bmMgKGZpbGUpID0+IHtcclxuXHRcdFx0Ly8gaXMgYSBkYWlseSBub3RlXHJcblx0XHRcdGNvbnN0IGRhaWx5Tm90ZXNEaXJlY3RvcnkgPSB0aGlzLmdldERhaWx5Tm90ZXNEaXJlY3RvcnkoKVxyXG5cdFx0XHRpZiAoIWZpbGUucGF0aC5zdGFydHNXaXRoKGRhaWx5Tm90ZXNEaXJlY3RvcnkpKSByZXR1cm47XHJcblxyXG5cdFx0XHQvLyBpcyB0b2RheSdzIGRhaWx5IG5vdGVcclxuXHRcdFx0Y29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRpZiAoZ2V0SVNPRm9ybWF0dGVkRGF0ZSh0b2RheSkgIT09IGZpbGUuYmFzZW5hbWUpIHJldHVybjtcclxuXHJcblx0XHRcdC8vIHdhcyBqdXN0IGNyZWF0ZWRcclxuXHRcdFx0aWYgKHRvZGF5LmdldFRpbWUoKSAtIGZpbGUuc3RhdC5jdGltZSA+IE1BWF9USU1FX1NJTkNFX0NSRUFUSU9OKSByZXR1cm47XHJcblxyXG5cdFx0XHRjb25zdCBsYXN0RGFpbHlOb3RlID0gdGhpcy5nZXRMYXN0RGFpbHlOb3RlKCk7XHJcblx0XHRcdGlmIChsYXN0RGFpbHlOb3RlID09IG51bGwpIHJldHVybjtcclxuXHJcblx0XHRcdGNvbnN0IHVuZmluaXNoZWRUb2RvcyA9IGF3YWl0IHRoaXMuZ2V0QWxsVW5maW5pc2hlZFRvZG9zKGxhc3REYWlseU5vdGUpXHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgZGFpbHlOb3RlQ29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSlcclxuXHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnRlbXBsYXRlSGVhZGluZyAhPT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0Y29uc3QgaGVhZGluZyA9IHRoaXMuc2V0dGluZ3MudGVtcGxhdGVIZWFkaW5nO1xyXG5cdFx0XHRcdGRhaWx5Tm90ZUNvbnRlbnQgPSBkYWlseU5vdGVDb250ZW50LnJlcGxhY2UoaGVhZGluZywgaGVhZGluZyArICdcXG4nICsgdW5maW5pc2hlZFRvZG9zLmpvaW4oJ1xcbicpICsgJ1xcbicpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGFpbHlOb3RlQ29udGVudCArPSAnXFxuJyArIHVuZmluaXNoZWRUb2Rvcy5qb2luKCdcXG4nKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgZGFpbHlOb3RlQ29udGVudCk7XHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFJvbGx2ZXJUb2Rvc1NldHRpbmdzIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblx0Y29uc3RydWN0b3IoYXBwLCBwbHVnaW4pIHtcclxuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKVxyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW5cclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldFRlbXBsYXRlSGVhZGluZ3MoKSB7XHJcblx0XHRjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuYXBwLmludGVybmFsUGx1Z2lucy5wbHVnaW5zWydkYWlseS1ub3RlcyddLmluc3RhbmNlLm9wdGlvbnMudGVtcGxhdGU7XHJcblx0XHRpZiAoIXRlbXBsYXRlKSByZXR1cm4gW107XHJcblx0XHRcclxuXHRcdGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgodGVtcGxhdGUgKyAnLm1kJylcclxuXHRcdGNvbnN0IHRlbXBsYXRlQ29udGVudHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpXHJcblx0XHRjb25zdCBhbGxIZWFkaW5ncyA9IEFycmF5LmZyb20odGVtcGxhdGVDb250ZW50cy5tYXRjaEFsbCgvI3sxLH0gLiovZykpLm1hcCgoW2hlYWRpbmddKSA9PiBoZWFkaW5nKVxyXG5cdFx0cmV0dXJuIGFsbEhlYWRpbmdzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGlzcGxheSgpIHtcclxuXHRcdGNvbnN0IHRlbXBsYXRlSGVhZGluZ3MgPSBhd2FpdCB0aGlzLmdldFRlbXBsYXRlSGVhZGluZ3MoKVxyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyRWwuZW1wdHkoKVxyXG5cdFx0bmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1RlbXBsYXRlIGhlYWRpbmcnKVxyXG5cdFx0XHQuc2V0RGVzYygnV2hpY2ggaGVhZGluZyBmcm9tIHlvdXIgdGVtcGxhdGUgc2hvdWxkIHRoZSB0b2RvcyBnbyB1bmRlcicpXHJcblx0XHRcdC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IGRyb3Bkb3duXHJcblx0XHRcdFx0LmFkZE9wdGlvbnMoe1xyXG5cdFx0XHRcdFx0Li4udGVtcGxhdGVIZWFkaW5ncy5yZWR1Y2UoKGFjYywgaGVhZGluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRhY2NbaGVhZGluZ10gPSBoZWFkaW5nO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0XHRcdFx0fSwge30pLFxyXG5cdFx0XHRcdFx0J25vbmUnOiAnTm9uZScgXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4/LnNldHRpbmdzLnRlbXBsYXRlSGVhZGluZylcclxuXHRcdFx0XHQub25DaGFuZ2UodmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVtcGxhdGVIZWFkaW5nID0gdmFsdWU7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYW4gSVNPIGZvcm1hdHRlZCBkYXRlIG9ubHkgZm9yIHRoZSB1c2VycyBjdXJyZW50IHRpbWV6b25lLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SVNPRm9ybWF0dGVkRGF0ZShkYXRlKSB7XHJcblx0Y29uc3QgbW9udGggPSBgJHtkYXRlLmdldE1vbnRoKCkgKyAxfWAucGFkU3RhcnQoMiwgXCIwXCIpXHJcblx0Y29uc3QgZGF5ID0gYCR7ZGF0ZS5nZXREYXRlKCl9YC5wYWRTdGFydCgyLCBcIjBcIik7XHJcblx0cmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGRheTtcclxufVxyXG4iXSwibmFtZXMiOlsiUGx1Z2luIiwiTm90aWNlIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlNldHRpbmciXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQztBQUNyQztBQUNlLE1BQU0sbUJBQW1CLFNBQVNBLGVBQU0sQ0FBQztBQUN4RCxDQUFDLHNCQUFzQixHQUFHO0FBQzFCLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEUsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxzQkFBc0IsR0FBRztBQUMxQixFQUFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksRUFBRTtBQUN4QyxHQUFHLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0FBQ25DLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUNyRyxFQUFFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0FBQ2xDLEVBQUU7QUFDRjtBQUNBLENBQUMsZ0JBQWdCLEdBQUc7QUFDcEIsRUFBRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQzVEO0FBQ0EsRUFBRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUNsRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM3RCxJ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
