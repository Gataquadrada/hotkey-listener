export const Listener = (node, params) => {
	const keysMap = {
		cmd: 'meta',
		ctrl: 'ctrl',
		alt: 'alt',
		shift: 'shift',
		up: 'arrowup',
		down: 'arrowdown',
		left: 'arrowleft',
		right: 'arrowright',
		enter: 'enter',
		return: 'enter',
		backspace: 'backspace',
		escape: 'escape',
		space: 'space'
	};

	let keysToListen =
		params?.keys?.map((key) => keysMap[key.toLowerCase()] ?? key.toLowerCase()) ?? [];
	let heldKeys = [];

	let handlerKeyDown,
		handlerKeyUp,
		comboTimer,
		comboStep = 0;

	const removeHandler = () => {
			window.removeEventListener('keydown', handlerKeyDown);
			window.removeEventListener('keyup', handlerKeyUp);
		},
		setHandler = () => {
			removeHandler();

			if (!params) return;

			/**
			 * @param {KeyboardEvent} e
			 */
			handlerKeyDown = (e) => {
				if (!keysToListen?.length) return;

				if (false === keysToListen.includes(e.key.toLowerCase())) return;

				if (params?.combo) {
					clearTimeout(comboTimer);

					if (e.key.toLowerCase() === keysToListen[comboStep]) {
						comboStep += 1;
						heldKeys.push(e.key.toLowerCase());
					} else {
						comboStep = 0;
						heldKeys = [];
					}

					comboTimer = setTimeout(() => {
						heldKeys = [];
					}, 3000);
				} else {
					heldKeys.push(e.key.toLowerCase());
				}

				if (heldKeys.length === keysToListen.length) {
					e.preventDefault();
					return params?.action?.() ?? node?.click() ?? null;
				}
			};

			handlerKeyUp = (e) => {
				if (!params?.keys?.length || params?.combo) return;
				heldKeys = heldKeys.filter((key) => key !== e.key.toLowerCase());
			};

			window.addEventListener('keydown', handlerKeyDown);
			window.addEventListener('keyup', handlerKeyUp);
		};

	setHandler();

	return {
		update: setHandler,
		destroy: removeHandler
	};
};

export default Listener;
