input.onButtonPressed(Button.A, function () {
    item += 1
})
let item = 0
weatherbit.startWeatherMonitoring()
basic.forever(function () {
    if (item == 0) {
        basic.showNumber(Math.idiv(weatherbit.humidity(), 1024))
        basic.showString("Temp C: ")
        basic.showNumber(Math.idiv(weatherbit.temperature(), 100))
    } else if (item == 1) {
        basic.showString("Humidity %: ")
    } else if (item == 2) {
        basic.showString("r=")
        basic.showNumber(weatherbit.pressure())
    } else {
        item = 0
    }
})
