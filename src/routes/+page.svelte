<script>
	import { Hotkey } from '$lib';
</script>

<div class="mx-auto my-5 flex w-full max-w-70 flex-col gap-3 rounded bg-pink-200 p-5 shadow-md">
	<div class="flex items-center justify-between">
		<span class="text-sm font-medium text-slate-900">Open/Close Help</span>
		<Hotkey
			keys={['?']}
			action={() => {
				const helpDialog = document.getElementById('help-dialog');

				if (helpDialog) {
					if (helpDialog.open) {
						helpDialog.close();
						return;
					}

					helpDialog.showModal();
				}
			}}
		/>
	</div>
</div>

<dialog
	id="help-dialog"
	class="mx-auto mt-3 w-full max-w-lg rounded-md p-0 shadow-lg ring-1 ring-slate-900/10"
>
	<form method="dialog" class="flex flex-col gap-4 p-6">
		<header class="flex items-center justify-between">
			<h2 class="text-lg font-medium text-slate-900">Keyboard Shortcuts</h2>
			<button type="submit" class="text-slate-400 hover:text-slate-600">&times;</button>
		</header>
		<div class="flex flex-col gap-3">
			<div class="flex justify-between">
				<span>Open/Close Help</span>
				<Hotkey keys={['?']} />
			</div>
			<div class="flex justify-between">
				<span>Save Document</span>
				<Hotkey
					keys={['ctrl', 's']}
					action={() => {
						alert('Save Document');
					}}
				/>
			</div>
			<div class="flex justify-between">
				<span>Open Settings</span>
				<Hotkey
					keys={['ctrl', ',']}
					action={() => {
						alert('Open Settings');
					}}
				/>
			</div>
		</div>
	</form>
</dialog>
