const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you',
        options: [
            {
                text: 'Take goo',
                setState: { blueGloo: true },
                nextText: 2,
            },
            {
                text: 'Leave goo',
            }
        ],
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                // checks the current state
                requiredState: (currentState) => currentState.blueGloo,
                setState: { blueGloo: false, sword: true },
                nextText: 3,
            },
            {
                text: 'Trade the goo for a shield',
                // checks the current state
                requiredState: (currentState) => currentState.blueGloo,
                setState: { blueGloo: false, shield: true },
                nextText: 3,
            },
            {
                text: 'Ignore the merchat',
                nextText: 3,
            },
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4,
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5,
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6,
            },
        ],
    },
    {
        id: 4,
        text: 'You are tired that you fall asleep while exploring the castle and are killed some terrible monster in your sleep',
        options: [
            {
                text: 'Restart',
                nextText: -1,   // singles to restart the game
            }
        ]
    }
];

function startGame() {
    // starts game and sets state
    state = {};
    showTextNode(1);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;

    if (nextTextNodeId === -1) {
        return startGame()
    }

    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

function showTextNode(textNodeIndex) {
    // current text
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    // to show text
    textElement.innerText = textNode.text;

    // remove uncessary options
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    };

    // add options
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        };
    })
}

function showOption(option) {
    // return true;
    return option.requiredState == null || option.requiredState(state)
}

startGame();