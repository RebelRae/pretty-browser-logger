// ------------------------------ //
// -Pretty Browser Logger ------- //
// -V 0.0.1---------------------- //
// -Author: Rebel Rae Brown------ //
// -Rev Date: Jan, 17 2021------- //
// ------------------------------ //
class Logger {
    constructor() {
        this.base = [
            "color: #eee",
            "text-shadow: 0px 0px 3px #000, 0px 0px 3px #000, 0px 0px 3px #000",
            "border-radius: 6px",
            "padding: 1px 8px",
            "font-weight: bold"
        ]
        this.styles = {
            log: [
                ...this.base,
                "background-color: #bbb"
            ],
            info: [
                ...this.base,
                "background-color: #55f"
            ],
            success: [
                ...this.base,
                "background-color: #5f5"
            ],
            warning: [
                ...this.base,
                "background-color: #fc5"
            ],
            error: [
                ...this.base,
                "background-color: #f55"
            ],
            object: [
                ...this.base,
                "background-color: #c5c"
            ],
            null_undefined: [
                "color: #c5c"
            ],
            boolean: [
                "color: #77f"
            ],
            string: [
                "color: #c63"
            ],
            number: [
                "color: #fc5"
            ]
        }
    }
    log = (text) => {
        console.log(`%cLOG :%c ${text}`, this.styles.log.join('; '), '')
    }
    info = (text) => {
        console.log(`%cINFO :%c ${text}`, this.styles.info.join('; '), '')
    }
    success = (text) => {
        console.log(`%cSUCCESS :%c ${text}`, this.styles.success.join('; '), '')
    }
    warn = (text) => {
        console.log(`%cWARNING :%c ${text}`, this.styles.warning.join('; '), '')
    }
    error = (text) => {
        console.log(`%cERROR :%c ${text}`, this.styles.error.join('; '), '')
    }
    recur = (obj = {}, depth, k = null) => {
        const isArray = Array.isArray(obj)
        let len = isArray ? obj.length : 0
        let last = true
        for (let key in obj)
            if (!isArray && obj.hasOwnProperty(key))
                len++
        let space = ''
        for (let i = 0; i < depth; i++)
            space += '              '
        isArray ? console.groupCollapsed(`${space}${k ? k + ': ' : ''}${isArray ? '[' : '{'}`) : console.group(`${space}${k ? k + ': ' : ''}${isArray ? '[' : '{'}`)
        let i = 0
        for (let key in obj) {
            last = !(i === len - 1)
            space = ''
            for (let i = 0; i <= depth; i++)
                space += '              '
            if (typeof obj[key] === 'object') {
                if (obj[key] === null)
                    console.log(`${space}${isArray ? '' : key + ': '}%c${obj[key]}%c${!last ? '' : ','}\n`, this.styles.null_undefined.join(';'), '')
                else
                    this.recur(obj[key], depth + 1, key)
            } else if (typeof obj[key] === 'string') {
                console.log(`${space}${isArray ? '' : key + ': '}%c"${obj[key]}"%c${!last ? '' : ','}\n`, this.styles.string.join(';'), '')
            } else if (typeof obj[key] === 'number') {
                console.log(`${space}${isArray ? '' : key + ': '}%c${obj[key]}%c${!last ? '' : ','}\n`, this.styles.number.join(';'), '')
            } else if (typeof obj[key] === 'boolean') {
                console.log(`${space}${isArray ? '' : key + ': '}%c${obj[key]}%c${!last ? '' : ','}\n`, this.styles.boolean.join(';'), '')
            } else if (typeof obj[key] === 'undefined') {
                console.log(`${space}${isArray ? '' : key + ': '}%c${obj[key]}%c${!last ? '' : ','}\n`, this.styles.null_undefined.join(';'), '')
            } else
                space += `${key} : ${obj[key]},\n`
            i++
        }
        space = ''
        for (let i = 0; i < depth; i++)
            space += '              '
        console.log(`${space}${isArray ? ']' : '}'}${last ? ',' : ''}`)
        console.groupEnd()
    }
    object = (obj) => {
        console.log(`%cOBJECT :`, this.styles.object.join('; '))
        this.recur(obj, 0)
    }
}

const logger = new Logger()
