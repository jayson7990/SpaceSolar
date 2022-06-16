// ## method 1 -  Taylor series
const calculatePI = (iterations) => {
    let i = 1n
    let x = 3n * 10n ** (BigInt(iterations) + 20n)
    let pi = x
    while (x > 0) {
        x = (x * i) / ((i + 1n) * 4n)
        pi += x / (i + 2n)
        i += 2n
    }
    return (pi / 10n ** 20n).toString().replace(/^(\d{1})(.*)/gi, "$1.$2")
}

// method 2 - spigot algorithm
export const calculatePI2 = (iterations) => {
    let q = 1n,
        r = 180n,
        t = 60n,
        i = 2n,
        limit= 0,
        result = ''
    while (limit < iterations) {
        let y = (q * (27n * i - 12n) + 5n * r) / (5n * t)
        let u = 3n * (3n * i + 1n) * (3n * i + 2n)
        r = 10n * u * (q * (5n * i - 2n) + r - y * t)
        q = 10n * q * i * (2n * i - 1n)
        t = t * u
        i = i + 1n
        result += y.toString()
        if (i === 3n) {
            result += "."
        }
        limit++
    }
    return result
}

export default calculatePI
