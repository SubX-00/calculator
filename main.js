const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.key');
const darkToggle = document.getElementById('darkModeToggle');
const statusToggle = document.getElementById('statusToggle');

let currentInput = '';
let darkMode = false;

// Update Dark Mode icon based on theme
function updateDarkIcon() {
    darkToggle.textContent = darkMode ? '☀️' : '🌙';
}

// Button functionality
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            screen.textContent = '0';
            updateStatus('⚡');
            return;
        }

        if (value === '+/-') {
            if (currentInput) {
                currentInput = currentInput.startsWith('-')
                    ? currentInput.slice(1)
                    : '-' + currentInput;
                screen.textContent = currentInput;
            }
            return;
        }

        if (value === '√') {
            try {
                const result = Math.sqrt(eval(currentInput.replace(/X/g, '*')));
                screen.textContent = result;
                currentInput = result.toString();
                updateStatus(result >= 0 ? '✅' : '⚡');
            } catch {
                screen.textContent = 'Error';
                currentInput = '';
                updateStatus('⚡');
            }
            return;
        }

        if (value === '%') {
            try {
                const result = eval(currentInput.replace(/X/g, '*')) / 100;
                screen.textContent = result;
                currentInput = result.toString();
                updateStatus('✅');
            } catch {
                screen.textContent = 'Error';
                currentInput = '';
                updateStatus('⚡');
            }
            return;
        }

        if (value === '=') {
            try {
                const result = eval(currentInput.replace(/X/g, '*'));
                screen.textContent = result;
                currentInput = result.toString();
                updateStatus('✅');
            } catch {
                screen.textContent = 'Error';
                currentInput = '';
                updateStatus('⚡');
            }
            return;
        }

        currentInput += value;
        screen.textContent = currentInput;
    });
});

// Dark mode toggle
darkToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    updateDarkIcon(); // Update icon dynamically
});

// Status icon toggle
function updateStatus(icon) {
    statusToggle.textContent = icon;
}

// Initialize dark icon on load
updateDarkIcon();