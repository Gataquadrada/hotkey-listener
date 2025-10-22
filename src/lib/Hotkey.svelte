<script>
	import HotkeyListener from './HotkeyListener.js';

	const { keys = [], action = null, wrapper = true, combo = false, ...__props } = $props();

	const keysLabels = {
		meta: '⌘',
		cmd: '⌘',
		ctrl: 'Ctrl',
		alt: 'Alt',
		shift: 'Shift',
		up: '↑',
		down: '↓',
		left: '←',
		right: '→',
		enter: '⏎',
		backspace: '⌫',
		escape: 'Esc',
		space: 'Space'
	};
</script>

{#if keys.length}
	<div
		use:HotkeyListener={{ keys, action, combo }}
		class="font-spacemono pointer-events-none z-2 inline-flex items-center gap-1 text-sm font-light {wrapper
			? 'dark:highlight-white/5 h-6 rounded-md px-2 py-1 leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
			: ''} {__props?.class ?? ''}"
	>
		{#each keys as key}
			<kbd class="hotkey">{keysLabels?.[key?.toLowerCase()] ?? key?.toLowerCase() ?? '?'}</kbd>
		{/each}
	</div>
{/if}
