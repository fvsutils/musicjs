const keyboardKeys = [
    'C','C#','D','D#','E','F','F#','G','G#','A','A#','B',
    'C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2',
    'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
    'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
    'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
    'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A6','A#6','B6',
    'C7','C#7','D7','D#7','E7','F7','F#7','G7','G#7','A7','A#7','B7',
]

function drawDot(canvas, x, y, radius) {
    //const canvas = document.getElementById(canvas);
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#777';
    ctx.fill();

}

function drawKeyboard(canvas, x, y, octaves, whiteKeyWidth) {

    for (let i = 0; i < octaves; i++) {
        drawOctave(canvas, x, y, whiteKeyWidth)
        x += 7 * whiteKeyWidth
    }
}

function drawOctave(canvas, x, y, whiteKeyWidth) {

    const whiteKeyHeigth = whiteKeyWidth * 4
    const blackKeyWidth = whiteKeyWidth / 2
    const blackKeyHeigth = whiteKeyHeigth * 0.6

    let blackKeyX = (x + whiteKeyWidth) - (blackKeyWidth / 2)

    for (let i = 0; i < 7; i++) {
        drawKey(canvas, x, y, whiteKeyWidth, whiteKeyHeigth)
        x += whiteKeyWidth
    }

    for (let i = 0; i < 7; i++) {
        if (i !== 2 && i !== 6) {
            drawKey(canvas, blackKeyX, y, blackKeyWidth, blackKeyHeigth, true)
        }
        blackKeyX += 2 * blackKeyWidth
    }
}

function drawKey(canvas, x, y, w, h, isBlack, isScored) {
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = !isBlack ? '#fff' : '#000';
    ctx.fillRect(x, y, w, h);

    if (isScored) {
        const radius = !isBlack ? w * 0.33 : w*0.7
        drawDot(canvas, x + (w / 2), y + h - radius * 1.5, radius)
    }
}

function getKeyboard(startKey, endKey) {
    
    const startPos = keyboardKeys.indexOf(startKey)
    const endPos = keyboardKeys.indexOf(endKey)

    const keys = keyboardKeys.slice(startPos, endPos+1)

    return keys
}

function buildKeyboard(keys, whiteKeyWidth, scored) {
    const keysObj = []

    let x = 1
    let y = 1
    const whiteKeyHeigth = whiteKeyWidth * 4
    const blackKeyWidth = whiteKeyWidth / 2
    const blackKeyHeigth = whiteKeyHeigth * 0.6

    /* canvas.width = 11*whiteKeyWidth+2*x
    canvas.height = whiteKeyHeigth+2*y */

    scored = scored.map(item => flat2sharp(item))
    
    for(let i = 0; i < keys.length; i++) {
        let currentKey = flat2sharp(keys[i])
        if(currentKey.indexOf('#') < 0) {
            keysObj.push({
                name: currentKey,
                type: 'white',
                x: x,
                y: y,
                w: whiteKeyWidth,
                h: whiteKeyHeigth,
                isScored: scored.indexOf(currentKey) >= 0
            })
            x += whiteKeyWidth
        } else {
            keysObj.push({
                name: keys[i],
                type: 'black',
                x: i !== 0 ? x-(blackKeyWidth/2) : x,
                y: y,
                w: blackKeyWidth,
                h: blackKeyHeigth,
                isScored: scored.indexOf(keys[i]) >= 0
            })
            if(i === 0) {
                x = x+(blackKeyWidth/2)
            }
        }
    }

    return keysObj
}

function flat2sharp(key) {

    const flats = {
        'Cb':'B','Db':'C#','Eb':'D#','Fb':'E','Gb':'F#','Ab':'G#','Bb':'A#','Cb':'B','Db':'C#','Eb':'D#','Fb':'E','Gb':'F#','Ab':'G#','Bb':'A#',
        'Cb2':'B2','Db2':'C#2','Eb2':'D#2','Fb2':'E2','Gb2':'F#2','Ab2':'G#2','Bb2':'A#2','Cb2':'B2','Db2':'C#2','Eb2':'D#2','Fb2':'E2','Gb2':'F#2','Ab2':'G#2','Bb2':'A#2',
        'Cb3':'B3','Db3':'C#3','Eb3':'D#3','Fb3':'E3','Gb3':'F#3','Ab3':'G#3','Bb3':'A#3','Cb3':'B3','Db3':'C#3','Eb3':'D#3','Fb3':'E3','Gb3':'F#3','Ab3':'G#3','Bb3':'A#3',
        'Cb4':'B4','Db4':'C#4','Eb4':'D#4','Fb4':'E4','Gb4':'F#4','Ab4':'G#4','Bb4':'A#4','Cb4':'B4','Db4':'C#4','Eb4':'D#4','Fb4':'E4','Gb4':'F#4','Ab4':'G#4','Bb4':'A#4',
        'Cb5':'B5','Db5':'C#5','Eb5':'D#5','Fb5':'E5','Gb5':'F#5','Ab5':'G#5','Bb5':'A#5','Cb5':'B5','Db5':'C#5','Eb5':'D#5','Fb5':'E5','Gb5':'F#5','Ab5':'G#5','Bb5':'A#5',
        'Cb6':'B6','Db6':'C#6','Eb6':'D#6','Fb6':'E6','Gb6':'F#6','Ab6':'G#6','Bb6':'A#6','Cb6':'B6','Db6':'C#6','Eb6':'D#6','Fb6':'E6','Gb6':'F#6','Ab6':'G#6','Bb6':'A#6',
        'Cb7':'B7','Db7':'C#7','Eb7':'D#7','Fb7':'E7','Gb7':'F#7','Ab7':'G#7','Bb7':'A#7','Cb7':'B7','Db7':'C#7','Eb7':'D#7','Fb7':'E7','Gb7':'F#7','Ab7':'G#7','Bb7':'A#7'
    }

    if(Object.keys(flats).indexOf(key) >= 0)
        return flats[key]

    return key
}

function drawKeyboardFromObjs(canvas, keyboard) {

    const whiteKey = keyboard.find(item => item.type === 'white')
    
    const whiteKeyHeigth = whiteKey.w * 4
    canvas.width = keyboard[keyboard.length-1].x + whiteKey.w+1
    canvas.height = whiteKeyHeigth+2*whiteKey.y

    for(let i = 0; i < keyboard.length; i++) {
        const item = keyboard[i]
        if(item.type === 'white') {
            drawKey(canvas, item.x, item.y, item.w, item.h, false, item.isScored)
        }
    }

    for(let i = 0; i < keyboard.length; i++) {
        const item = keyboard[i]
        if(item.type === 'black') {
            drawKey(canvas, item.x, item.y, item.w, item.h, true, item.isScored)
        }
    }
}