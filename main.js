window.onload = function () {

    $('div.musicjs').each(function () {
        const canvas = $('<canvas></canvas>')
        const keyWidth = $(this).attr('keyWidth') ? parseInt($(this).attr('keyWidth')) : 20
        let item = null
        if ($(this).attr('chord')) {
            item = getChords()[$(this).attr('chord')]
        } else if ($(this).attr('scale')) {
            item = getScales()[$(this).attr('scale')]
        } else if ($(this).attr('notes')) {
            item = $(this).attr('notes').split(',')
        }
        drawInCanvas(canvas[0], keyWidth, item)
        $(this).append(canvas)
    })

}

function drawInCanvas(canvas, keyWidth, item) {
    let keyboard = getKeyboardConf(item)
    drawKeyboardFromObjs(canvas, buildKeyboard(getKeyboard(keyboard.init, keyboard.end), keyWidth, item))
}

function getKeyboardConf(item) {
    
    if (item[0][0] === 'A' || item[0][0] === 'B' || item[0][0] === 'G' || item[0][0] === 'F')
        return {init: 'F', end: 'B2'}
    else
        return {init: 'C', end: 'E2'}
}

function getChords() {

    return {
        'C': ['C', 'E', 'G'],
        'C#': ['C#', 'F', 'G#'],
        'D': ['D', 'F#', 'A'],
        'D#': ['D#', 'G', 'A#'],
        'E': ['E', 'G#', 'B'],
        'F': ['F', 'A', 'C2'],
        'F#': ['F#', 'A#', 'C#2'],
        'G': ['G', 'B', 'D2'],
        'G#': ['G#', 'C2', 'D#2'],
        'A': ['A', 'C#2', 'E2'],
        'A#': ['A#', 'D2', 'F2'],
        'B': ['B', 'D#2', 'F#2'],
        'Cm': ['C', 'Eb', 'G'],
        'C#m': ['C#', 'E', 'G#'],
        'Dm': ['D', 'F', 'A'],
        'D#m': ['D#', 'F#', 'A#'],
        'Em': ['E', 'G', 'B'],
        'Fm': ['F', 'Ab', 'C2'],
        'F#m': ['F#', 'A', 'C#2'],
        'Gm': ['G', 'Bb', 'D2'],
        'G#m': ['G#', 'B', 'D#2'],
        'Am': ['A', 'C2', 'E2'],
        'A#m': ['A#', 'C#2', 'F2'],
        'Bm': ['B', 'D2', 'F#2'],
        'Cdim': ['C','Eb','Gb'],
        'C#dim': ['C#','E','G'],
        'Ddim': ['D','F','Ab'],
        'D#dim': ['D#','F#','A'],
        'Edim': ['E','G','Bb'],
        'Fdim': ['F','Ab','Cb'],
        'F#dim': ['F#','A','C2'],
        'Gdim': ['G','Bb','Db2'],
        'G#dim': ['G#','B','D2'],
        'Adim': ['A','C2','Eb2'],
        'A#dim': ['A#','C#2','E2'],
        'Bdim': ['B','D2','F2']
    }
}

function getScales() {
    return {
        'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'],
        'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#2', 'D2'],
        'E': ['E', 'F#', 'G#', 'A', 'B', 'C#2', 'D#2', 'E2'],
        'F': ['F', 'G', 'A', 'Bb', 'C2', 'D2', 'E2', 'F2'],
        'G': ['G', 'A', 'B', 'C2', 'D2', 'E2', 'F#2', 'G2'],
        'A': ['A', 'B', 'C#2', 'D2', 'E2', 'F#2', 'G#2', 'A2'],
        'B': ['B', 'C#2', 'D#2', 'E2', 'F#2', 'G#2', 'A#2', 'B2'],

        'Cm': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C2'],
        'Dm': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C2', 'D2'],
        'Em': ['E', 'F#', 'G', 'A', 'B', 'C2', 'D2', 'E2'],
        'Fm': ['F', 'G', 'Ab', 'Bb', 'C2', 'Db2', 'Eb2', 'F2'],
        'Gm': ['G', 'A', 'Bb', 'C2', 'D2', 'Eb2', 'F2', 'G2'],
        'Am': ['A', 'B', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2'],
        'Bm': ['B', 'C#2', 'D2', 'E2', 'F#2', 'G2', 'A2', 'B2'],

        'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
        'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C2', 'D2'],
        'F#': ['F#', 'G#', 'A#', 'B', 'C#2', 'D#2', 'F2'],
        'Ab': ['Ab', 'Bb', 'C2', 'Db2', 'Eb2', 'F2', 'G2'],
        'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],

        'A#m': ['A#', 'B#', 'C#2', 'D#2', 'E#2', 'F#2', 'G#2'],
        'C#m': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
        'D#m': ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#2'],
        'F#m': ['F#', 'G#', 'A', 'B', 'C#2', 'D2', 'E2'],
        'G#m': ['G#', 'A#', 'B', 'C#2', 'D#2', 'E2', 'F#2']
    }
}